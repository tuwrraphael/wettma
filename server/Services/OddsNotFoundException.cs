using System;
using System.Runtime.Serialization;

namespace Wettma.Services
{
    [Serializable]
    internal class OddsNotFoundException : Exception
    {
        public OddsNotFoundException()
        {
        }

        public OddsNotFoundException(string message) : base(message)
        {
        }

        public OddsNotFoundException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected OddsNotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}