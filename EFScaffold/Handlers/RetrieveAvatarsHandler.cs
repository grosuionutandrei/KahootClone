using EFScaffold.Dto;
using EFScaffold.querry;
using EFScaffold.Repos.avatar;
using MediatR;

namespace EFScaffold.Handlers;

public class RetrieveAvatarsHandler:IRequestHandler<Avatars,AvatarsDto>
{
    private IAvatarRepo _avatarRepo;

    public RetrieveAvatarsHandler(IAvatarRepo avatarRepo)
    {
        _avatarRepo = avatarRepo;
    }

    public Task<AvatarsDto> Handle(Avatars request, CancellationToken cancellationToken)
    {
        return _avatarRepo.RetrievAvatars(request.GameId);
    }
}