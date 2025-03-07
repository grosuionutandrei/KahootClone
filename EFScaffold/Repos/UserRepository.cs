using System.Runtime.InteropServices.JavaScript;
using EFScaffold;
using EFScaffold.commands;
using EFScaffold.Dto;
using EFScaffold.EntityFramework;
using EFScaffold.Repos;

public class UserRepository : IUserRepository
{
    
    public UserRepository(KahootContext dbContext)
    {
        this.dbContext = dbContext;
    } 

    private KahootContext dbContext;
    public async Task<bool> SaveOrUpdate(AddPlayer request)
    {
        Player player = new Player()
        {
            Id = request.Player.Id, AvatarId = request.Player.AvatarId, GameId = request.Player.GameId,
            Nickname = request.Player.Nickname
        };
        var players = await dbContext.Players.AddAsync(player);
        await dbContext.SaveChangesAsync();
        return true;
    }

    public async  Task<GameCreatedDto> CreateGAme(Guid id, string newGameName)
    {
        var game = new Game() { Id = id.ToString(), Name = newGameName };
        var games = await dbContext.Games.AddAsync(game);
        try
        {
            await dbContext.SaveChangesAsync();
            return new GameCreatedDto() { Id = game.Id, Success = true ,Name=game.Name};
        }
        catch (Exception e)
        {
            return new GameCreatedDto() { Id = game.Id, Success = false,Name = game.Name };
        }






    }

    public async  Task<List<PlayerInfoDto>> RetrievePlayersForGame(string requestGameId)
    {
      
        
        
        
        return r
    }
}