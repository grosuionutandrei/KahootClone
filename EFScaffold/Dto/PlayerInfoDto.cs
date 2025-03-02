namespace EFScaffold.Dto;

public class PlayerInfoDto
{
    public string Id { get; set; } = null!;
    public string? GameId { get; set; }
    public string Nickname { get; set; } = null!;
    public string AvatarId { get; set; } = null!;
}