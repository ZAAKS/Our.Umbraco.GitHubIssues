using Our.Umbraco.GitHubIssues.Application.DTOs;
using Our.Umbraco.GitHubIssues.Application.Interfaces;
using Our.Umbraco.GitHubIssues.Application.Mapping;
using Our.Umbraco.GitHubIssues.Domain.Interfaces;

namespace Our.Umbraco.GitHubIssues.Application.Services;

public class IssueService : IIssueService
{
    private readonly IGitHubRepository _gitHubRepository;

    public IssueService(IGitHubRepository gitHubRepository)
    {
        _gitHubRepository = gitHubRepository;
    }

    public async Task<IEnumerable<IssueDto>> GetAllIssuesAsync(CancellationToken cancellationToken = default)
    {
        var issues = await _gitHubRepository.GetAllIssuesAsync(cancellationToken);
        return IssueMapper.ToDtoList(issues);
    }

    public async Task<IEnumerable<IssueDto>> GetUpForGrabsIssuesAsync(CancellationToken cancellationToken = default)
    {
        var issues = await _gitHubRepository.GetUpForGrabsIssuesAsync(cancellationToken);
        return IssueMapper.ToDtoList(issues);
    }

    public async Task<IssueDto?> GetIssueByNumberAsync(int number, CancellationToken cancellationToken = default)
    {
        var issue = await _gitHubRepository.GetIssueByNumberAsync(number, cancellationToken);
        return issue != null ? IssueMapper.ToDto(issue) : null;
    }
}
