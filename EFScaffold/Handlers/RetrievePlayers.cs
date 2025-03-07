using EFScaffold.Dto;
using EFScaffold.querry;
using EFScaffold.Repos;
using MediatR;

public class retrievePlayersHandler:IRequestHandler<RetrievePlayers,List<PlayerInfoDto>>
{
    private IUserRepository userRepository;

    public retrievePlayersHandler(IUserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    public async Task<List<PlayerInfoDto>> Handle(RetrievePlayers request, CancellationToken cancellationToken)
    {
        var response = await userRepository.RetrievePlayersForGame(request.gameId);
        return response;
}