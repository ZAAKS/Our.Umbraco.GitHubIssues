using System.Net.Http.Headers;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using Our.Umbraco.GitHubIssues.Domain.Entities;
using Our.Umbraco.GitHubIssues.Domain.Interfaces;
using Our.Umbraco.GitHubIssues.Infrastructure.GitHub.Models;

namespace Our.Umbraco.GitHubIssues.Infrastructure.GitHub;

public class GitHubRepository : IGitHubRepository
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<GitHubRepository> _logger;
    private const string BaseUrl = "https://api.github.com";
    private const string RepoOwner = "umbraco";
    private const string RepoName = "Umbraco-CMS";

    public GitHubRepository(HttpClient httpClient, ILogger<GitHubRepository> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
        
        _httpClient.BaseAddress = new Uri(BaseUrl);
        _httpClient.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("Our.Umbraco.GitHubIssues", "1.0"));
        _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/vnd.github.v3+json"));
    }

    public async Task<IEnumerable<GitHubIssue>> GetAllIssuesAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            var url = $"/repos/{RepoOwner}/{RepoName}/issues?state=open&per_page=100";
            var response = await _httpClient.GetAsync(url, cancellationToken);
            
            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError("GitHub API request failed with status code: {StatusCode}", response.StatusCode);
                return Enumerable.Empty<GitHubIssue>();
            }

            var content = await response.Content.ReadAsStringAsync(cancellationToken);
            var issues = JsonSerializer.Deserialize<List<GitHubIssueResponse>>(content);

            return issues?.Select(MapToDomain) ?? Enumerable.Empty<GitHubIssue>();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching GitHub issues");
            return Enumerable.Empty<GitHubIssue>();
        }
    }

    public async Task<IEnumerable<GitHubIssue>> GetUpForGrabsIssuesAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            var url = $"/repos/{RepoOwner}/{RepoName}/issues?state=open&labels=community/up-for-grabs&per_page=100";
            var response = await _httpClient.GetAsync(url, cancellationToken);
            
            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError("GitHub API request failed with status code: {StatusCode}", response.StatusCode);
                return Enumerable.Empty<GitHubIssue>();
            }

            var content = await response.Content.ReadAsStringAsync(cancellationToken);
            var issues = JsonSerializer.Deserialize<List<GitHubIssueResponse>>(content);

            return issues?.Select(MapToDomain) ?? Enumerable.Empty<GitHubIssue>();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching up-for-grabs issues");
            return Enumerable.Empty<GitHubIssue>();
        }
    }

    public async Task<GitHubIssue?> GetIssueByNumberAsync(int number, CancellationToken cancellationToken = default)
    {
        try
        {
            var url = $"/repos/{RepoOwner}/{RepoName}/issues/{number}";
            var response = await _httpClient.GetAsync(url, cancellationToken);
            
            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError("GitHub API request failed with status code: {StatusCode}", response.StatusCode);
                return null;
            }

            var content = await response.Content.ReadAsStringAsync(cancellationToken);
            var issue = JsonSerializer.Deserialize<GitHubIssueResponse>(content);

            return issue != null ? MapToDomain(issue) : null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching issue #{Number}", number);
            return null;
        }
    }

    private GitHubIssue MapToDomain(GitHubIssueResponse response)
    {
        return new GitHubIssue
        {
            Id = response.Id,
            Number = response.Number,
            Title = response.Title,
            State = response.State,
            HtmlUrl = response.HtmlUrl,
            CreatedAt = response.CreatedAt,
            UpdatedAt = response.UpdatedAt,
            ClosedAt = response.ClosedAt,
            Body = response.Body ?? string.Empty,
            User = response.User != null ? new User
            {
                Id = response.User.Id,
                Login = response.User.Login,
                AvatarUrl = response.User.AvatarUrl,
                HtmlUrl = response.User.HtmlUrl
            } : null,
            Labels = response.Labels.Select(l => new Label
            {
                Id = l.Id,
                Name = l.Name,
                Color = l.Color,
                Description = l.Description ?? string.Empty
            }).ToList(),
            Comments = response.Comments
        };
    }
}
