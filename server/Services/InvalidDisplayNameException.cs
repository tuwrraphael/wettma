using System;
using System.Runtime.Serialization;

namespace Wettma.Services
{
    [Serializable]
    internal class InvalidDisplayNameException : Exception
    {
        public InvalidDisplayNameException()
        {
        }

        public InvalidDisplayNameException(string message) : base(message)
        {
        }

        public InvalidDisplayNameException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected InvalidDisplayNameException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}