using EFScaffold.commands;
using EFScaffold.Dto;

namespace EFScaffold.Repos;

public interface IUserRepository
{
    Task<bool> SaveOrUpdate(AddPlayer request);
    Task<GameCreatedDto> CreateGAme(Guid id, string newGameName);
    Task<List<PlayerInfoDto>> RetrievePlayersForGame(string requestGameId);
}