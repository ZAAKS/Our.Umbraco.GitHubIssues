using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Our.Umbraco.GitHubIssues.Application.Interfaces;
using Our.Umbraco.GitHubIssues.Application.Services;
using Our.Umbraco.GitHubIssues.Domain.Interfaces;
using Our.Umbraco.GitHubIssues.Infrastructure.GitHub;

namespace Our.Umbraco.GitHubIssues.Composers;

public class Composer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        // Register HttpClient for GitHub API
        builder.Services.AddHttpClient<IGitHubRepository, GitHubRepository>();

        // Register application services
        builder.Services.AddScoped<IIssueService, IssueService>();
    }
}
