using Our.Umbraco.GitHubIssues.Application.DTOs;
using Our.Umbraco.GitHubIssues.Domain.Entities;

namespace Our.Umbraco.GitHubIssues.Application.Mapping;

public static class IssueMapper
{
    public static IssueDto ToDto(GitHubIssue issue)
    {
        return new IssueDto
        {
            Id = issue.Id,
            Number = issue.Number,
            Title = issue.Title,
            State = issue.State,
            HtmlUrl = issue.HtmlUrl,
            CreatedAt = issue.CreatedAt,
            UpdatedAt = issue.UpdatedAt,
            ClosedAt = issue.ClosedAt,
            Body = issue.Body,
            User = issue.User != null ? new UserDto
            {
                Id = issue.User.Id,
                Login = issue.User.Login,
                AvatarUrl = issue.User.AvatarUrl,
                HtmlUrl = issue.User.HtmlUrl
            } : null,
            Labels = issue.Labels.Select(l => new LabelDto
            {
                Id = l.Id,
                Name = l.Name,
                Color = l.Color,
                Description = l.Description
            }).ToList(),
            Comments = issue.Comments,
            IsUpForGrabs = issue.IsUpForGrabs
        };
    }

    public static IEnumerable<IssueDto> ToDtoList(IEnumerable<GitHubIssue> issues)
    {
        return issues.Select(ToDto);
    }
}
