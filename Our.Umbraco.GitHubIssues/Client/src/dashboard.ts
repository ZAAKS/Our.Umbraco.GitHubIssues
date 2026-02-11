import { LitElement, html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { unsafeHTML } from "lit/directives/unsafe-html.js";

interface Issue {
    id: number;
    number: number;
    title: string;
    state: string;
    htmlUrl: string;
    createdAt: string;
    updatedAt: string;
    body: string;
    user: {
        login: string;
        avatarUrl: string;
        htmlUrl: string;
    } | null;
    labels: Array<{
        name: string;
        color: string;
        description: string;
    }>;
    comments: number;
    isUpForGrabs: boolean;
}

@customElement('our-githubissues-dashboard')
export class GitHubIssuesDashboardElement extends UmbElementMixin(LitElement) {
    @state()
    private _issues: Issue[] = [];

    @state()
    private _loading = true;

    @state()
    private _error = '';

    @state()
    private _filter: 'all' | 'up-for-grabs' = 'all';

    @state()
    private _currentPage = 1;

    @state()
    private _pageSize = 15;


    connectedCallback() {
        super.connectedCallback();
        this._loadIssues();
    }

    private async _loadIssues() {
        this._loading = true;
        this._error = '';

        const authContext = await this.getContext(UMB_AUTH_CONTEXT);
        const token = await authContext?.getLatestToken();

        try {
            const endpoint = this._filter === 'up-for-grabs' 
                ? '/umbraco/backoffice/api/github/issues/up-for-grabs'
                : '/umbraco/backoffice/api/github/issues';

            const response = await fetch(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch issues: ${response.statusText}`);
            }

            this._issues = await response.json();
            this._currentPage = 1;
        } catch (error) {
            this._error = error instanceof Error ? error.message : 'An error occurred';
            console.error('Error loading issues:', error);
        } finally {
            this._loading = false;
        }
    }

    private _handleFilterChange(filter: 'all' | 'up-for-grabs') {
        this._filter = filter;
        this._loadIssues();
    }

    private _formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    private get _totalPages() {
        return Math.ceil(this._issues.length / this._pageSize);
    }

    private get _pagedIssues() {
        const start = (this._currentPage - 1) * this._pageSize;
        return this._issues.slice(start, start + this._pageSize);
    }

    private _goToPage(page: number) {
        if (page < 1 || page > this._totalPages) return;
        this._currentPage = page;
    }

    private _renderMarkdownLite(markdown: string): string {

        let htmlText = markdown;

        // Escape HTML
        htmlText = htmlText
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // Headings
        htmlText = htmlText.replace(/^###### (.*$)/gim, "<h6>$1</h6>");
        htmlText = htmlText.replace(/^##### (.*$)/gim, "<h5>$1</h5>");
        htmlText = htmlText.replace(/^#### (.*$)/gim, "<h4>$1</h4>");
        htmlText = htmlText.replace(/^### (.*$)/gim, "<h3>$1</h3>");
        htmlText = htmlText.replace(/^## (.*$)/gim, "<h2>$1</h2>");
        htmlText = htmlText.replace(/^# (.*$)/gim, "<h1>$1</h1>");

        // Bold & Italic
        htmlText = htmlText.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
        htmlText = htmlText.replace(/\*(.*?)\*/gim, "<em>$1</em>");

        // Inline code
        htmlText = htmlText.replace(/`(.*?)`/gim, "<code>$1</code>");

        // Links
        htmlText = htmlText.replace(
            /\[(.*?)\]\((.*?)\)/gim,
            `<a href="$2" target="_blank">$1</a>`
        );

        // Line breaks
        htmlText = htmlText.replace(/\n/g, "<br />");

        return htmlText;
    }

    render() {
        return html`
            <div class="githubissues-dashboard">
                <div class="header">
                    <h1>
                        <umb-icon name="icon-lab"></umb-icon>
                        Umbraco CMS GitHub Issues
                    </h1>
                    <p>Browse open issues from the Umbraco CMS repository</p>
                </div>

                <div class="filters">
                    <uui-button
                        look="${this._filter === 'all' ? 'primary' : 'default'}"
                        label="All Issues"
                        @click=${() => this._handleFilterChange('all')}
                    ></uui-button>
                    <uui-button
                        look="${this._filter === 'up-for-grabs' ? 'primary' : 'default'}"
                        label="Up for Grabs"
                        @click=${() => this._handleFilterChange('up-for-grabs')}
                    ></uui-button>
                    <uui-button
                        look="outline"
                        label="Refresh"
                        @click=${() => this._loadIssues()}
                    >
                        <umb-icon name="icon-refresh"></umb-icon>
                    </uui-button>
                </div>

                ${this._renderContent()}
            </div>
        `;
    }

    private _renderContent() {
        if (this._loading) {
            return html`
                <div class="loading">
                    <uui-loader></uui-loader>
                    <p>Loading issues...</p>
                </div>
            `;
        }

        if (this._error) {
            return html`
                <uui-box>
                    <div class="error">
                        <umb-icon name="icon-alert"></umb-icon>
                        <p>${this._error}</p>
                    </div>
                </uui-box>
            `;
        }

        if (this._issues.length === 0) {
            return html`
                <uui-box>
                    <div class="no-issues">
                        <umb-icon name="icon-check"></umb-icon>
                        <p>No issues found</p>
                    </div>
                </uui-box>
            `;
        }

        return html`
            <div class="issues-list">
                ${this._pagedIssues.map(issue => this._renderIssue(issue))}
            </div>
            <div class="pagination">
                <uui-button
                    look="outline"
                    ?disabled=${this._currentPage === 1}
                    @click=${() => this._goToPage(this._currentPage - 1)}
                >
                    Previous
                </uui-button>

                <span>
                    Page ${this._currentPage} of ${this._totalPages}
                </span>

                <uui-button
                    look="outline"
                    ?disabled=${this._currentPage === this._totalPages}
                    @click=${() => this._goToPage(this._currentPage + 1)}
                >
                    Next
                </uui-button>
            </div>
        `;
    }

    private _renderIssue(issue: Issue) {
        return html`
            <uui-box class="issue-card">
                <div class="issue-header">
                    <div class="issue-title">
                        <a href="${issue.htmlUrl}" target="_blank" rel="noopener noreferrer">
                            #${issue.number} - ${issue.title}
                        </a>
                        ${issue.isUpForGrabs ? html`
                            <span class="badge up-for-grabs">Up for Grabs</span>
                        ` : nothing}
                    </div>
                    <div class="issue-meta">
                        ${issue.user ? html`
                            <img src="${issue.user.avatarUrl}" alt="${issue.user.login}" class="avatar" />
                            <span>${issue.user.login}</span>
                        ` : nothing}
                        <span>•</span>
                        <span>Opened ${this._formatDate(issue.createdAt)}</span>
                        <span>•</span>
                        <span>${issue.comments} comments</span>
                    </div>
                </div>

                ${issue.labels.length > 0 ? html`
                    <div class="labels">
                        ${issue.labels.map(label => html`
                            <span class="label" style="background-color: #${label.color}">
                                ${label.name}
                            </span>
                        `)}
                    </div>
                ` : nothing}

                ${issue.body ? html`
                    <div class="issue-body">
                        ${unsafeHTML(this._renderMarkdownLite(issue.body))}
                    </div>
                ` : nothing}

                <div class="issue-actions">
                    <uui-button
                        look="outline"
                        label="View on GitHub"
                        href="${issue.htmlUrl}"
                        target="_blank"
                    >
                        <umb-icon name="icon-out"></umb-icon>
                        View on GitHub
                    </uui-button>
                </div>
            </uui-box>
        `;
    }

    static styles = css`
        :host {
            display: block;
            padding: var(--uui-size-space-5);
        }

        .githubissues-dashboard {
            max-width: 1200px;
            margin: 0 auto;
        }

        .header {
            margin-bottom: var(--uui-size-space-6);
        }

        .header h1 {
            display: flex;
            align-items: center;
            gap: var(--uui-size-space-3);
            margin: 0 0 var(--uui-size-space-2) 0;
            font-size: var(--uui-type-h3-size);
        }

        .header p {
            margin: 0;
            color: var(--uui-color-text-alt);
        }

        .filters {
            display: flex;
            gap: var(--uui-size-space-3);
            margin-bottom: var(--uui-size-space-5);
        }

        .loading,
        .error,
        .no-issues {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: var(--uui-size-space-6);
            text-align: center;
        }

        .loading umb-icon,
        .error umb-icon,
        .no-issues umb-icon {
            font-size: 3rem;
            margin-bottom: var(--uui-size-space-4);
        }

        .error {
            color: var(--uui-color-danger);
        }

        .issues-list {
            display: flex;
            flex-direction: column;
            gap: var(--uui-size-space-4);
        }

        .issue-card {
            padding: var(--uui-size-space-5);
        }

        .issue-header {
            margin-bottom: var(--uui-size-space-3);
        }

        .issue-title {
            display: flex;
            align-items: center;
            gap: var(--uui-size-space-3);
            margin-bottom: var(--uui-size-space-2);
        }

        .issue-title a {
            font-size: var(--uui-type-h5-size);
            font-weight: 600;
            color: var(--uui-color-interactive);
            text-decoration: none;
        }

        .issue-title a:hover {
            text-decoration: underline;
        }

        .badge {
            padding: var(--uui-size-space-1) var(--uui-size-space-3);
            border-radius: var(--uui-border-radius);
            font-size: var(--uui-type-small-size);
            font-weight: 600;
        }

        .badge.up-for-grabs {
            background-color: var(--uui-color-positive);
            color: var(--uui-color-positive-contrast);
        }

        .issue-meta {
            display: flex;
            align-items: center;
            gap: var(--uui-size-space-2);
            font-size: var(--uui-type-small-size);
            color: var(--uui-color-text-alt);
        }

        .avatar {
            width: 20px;
            height: 20px;
            border-radius: 50%;
        }

        .labels {
            display: flex;
            flex-wrap: wrap;
            gap: var(--uui-size-space-2);
            margin-bottom: var(--uui-size-space-3);
        }

        .label {
            padding: var(--uui-size-space-1) var(--uui-size-space-2);
            border-radius: var(--uui-border-radius);
            font-size: var(--uui-type-small-size);
            color: #fff;
        }

        .issue-body {
            margin-bottom: var(--uui-size-space-3);
            line-height: 1.6;
            color: var(--uui-color-text);
        }

        .issue-actions {
            display: flex;
            gap: var(--uui-size-space-3);
        }
        .pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: var(--uui-size-space-4);
            margin-top: var(--uui-size-space-6);
        }
        .issue-body {
            max-height: 160px;        /* adjust as you like */
            overflow-y: auto;
            padding: 8px;
            background: #f6f6f6;
            border-radius: 6px;
            font-size: 13px;
            line-height: 1.5;
        }

        /* Make code blocks readable */
        .issue-body code {
            background: #eaeaea;
            padding: 2px 4px;
            border-radius: 4px;
            font-family: monospace;
        }

        /* Headings spacing */
        .issue-body h1,
        .issue-body h2,
        .issue-body h3,
        .issue-body h4,
        .issue-body h5,
        .issue-body h6 {
            margin: 6px 0;
        }
        .issue-body::-webkit-scrollbar {
            width: 6px;
        }

        .issue-body::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 3px;
        }
    `;
}

export default GitHubIssuesDashboardElement;

declare global {
    interface HTMLElementTagNameMap {
        'our-githubissues-dashboard': GitHubIssuesDashboardElement;
    }
}
