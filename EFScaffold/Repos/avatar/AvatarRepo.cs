using EFScaffold.Dto;
using Microsoft.EntityFrameworkCore;

namespace EFScaffold.Repos.avatar;

public class AvatarRepo:IAvatarRepo

{
    private KahootContext dbContext;

    public AvatarRepo(KahootContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<AvatarsDto> RetrievAvatars(string gameId)
    {
        var takenAvatars = await dbContext.Players
            .Where(p => p.GameId!.Equals(gameId))
            .Select(p => p.AvatarId)
            .ToListAsync();

        var availableAvatars = await dbContext.Avatars
            .Where(a => !takenAvatars.Contains(a.Path))
            .Select(a => a.Path)
            .ToListAsync();

        return new AvatarsDto()
        {
            avatars = availableAvatars
        };
    }
}