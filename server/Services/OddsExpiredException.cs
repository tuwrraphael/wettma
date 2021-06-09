using System;
using System.Runtime.Serialization;

namespace Wettma.Services
{
    [Serializable]
    internal class OddsExpiredException : Exception
    {
        public OddsExpiredException()
        {
        }

        public OddsExpiredException(string message) : base(message)
        {
        }

        public OddsExpiredException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected OddsExpiredException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}