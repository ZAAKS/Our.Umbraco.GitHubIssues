namespace Our.Umbraco.GitHubIssues.Application.DTOs;
public class UserDto
{
    public long Id { get; set; }
    public string Login { get; set; } = string.Empty;
    public string AvatarUrl { get; set; } = string.Empty;
    public string HtmlUrl { get; set; } = string.Empty;
}
