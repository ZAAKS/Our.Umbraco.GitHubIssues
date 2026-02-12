using Our.Umbraco.GitHubIssues.Domain.Entities;

namespace Our.Umbraco.GitHubIssues.Domain.Interfaces;

public interface IGitHubRepository
{
    Task<IEnumerable<GitHubIssue>> GetAllIssuesAsync(CancellationToken cancellationToken = default);
    Task<IEnumerable<GitHubIssue>> GetUpForGrabsIssuesAsync(CancellationToken cancellationToken = default);
    Task<GitHubIssue?> GetIssueByNumberAsync(int number, CancellationToken cancellationToken = default);
}
