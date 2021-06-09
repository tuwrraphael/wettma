using System;
using System.Runtime.Serialization;

namespace Wettma.Services
{
    [Serializable]
    internal class OddsChangedException : Exception
    {
        public OddsChangedException()
        {
        }

        public OddsChangedException(string message) : base(message)
        {
        }

        public OddsChangedException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected OddsChangedException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}