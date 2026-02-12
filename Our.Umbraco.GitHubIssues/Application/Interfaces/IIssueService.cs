using Our.Umbraco.GitHubIssues.Application.DTOs;

namespace Our.Umbraco.GitHubIssues.Application.Interfaces;

public interface IIssueService
{
    Task<IEnumerable<IssueDto>> GetAllIssuesAsync(CancellationToken cancellationToken = default);
    Task<IEnumerable<IssueDto>> GetUpForGrabsIssuesAsync(CancellationToken cancellationToken = default);
    Task<IssueDto?> GetIssueByNumberAsync(int number, CancellationToken cancellationToken = default);
}
