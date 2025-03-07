using EFScaffold.Dto;

namespace EFScaffold.Repos.avatar;

public interface IAvatarRepo
{
    Task<AvatarsDto> RetrievAvatars(string gameId);
}