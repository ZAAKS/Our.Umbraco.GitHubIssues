namespace Our.Umbraco.GitHubIssues.Domain.Entities;

public class User
{
    public long Id { get; set; }
    public string Login { get; set; } = string.Empty;
    public string AvatarUrl { get; set; } = string.Empty;
    public string HtmlUrl { get; set; } = string.Empty;
}