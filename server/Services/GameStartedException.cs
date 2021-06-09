using System;
using System.Runtime.Serialization;

namespace Wettma.Services
{
    [Serializable]
    internal class GameStartedException : Exception
    {
        public GameStartedException()
        {
        }

        public GameStartedException(string message) : base(message)
        {
        }

        public GameStartedException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected GameStartedException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}