namespace Wettma
{
    public class UserId
    {
        public UserId(string internalId)
        {
            InternalId = internalId;
        }

        public string InternalId { get; set; }
    }
}
