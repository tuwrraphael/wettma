using Wettma.Services.DbModels;

namespace Wettma
{
    public static class ComputerPlayers
    {
        public static ComputerPlayer[] GetComputerPlayers()
        {
            return new[]
            {
                new ComputerPlayer()
                {
                    Id = 1,
                    Name = "Antoni Ingrid",
                    DisplayAsUser = false
                },
                new ComputerPlayer()
                {
                    Id = 2,
                    Name = "Alberto",
                    DisplayAsUser = true
                }
            };
        }
    }
}
