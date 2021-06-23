using System;
using System.Runtime.Serialization;

namespace Wettma.Services
{
    [Serializable]
    internal class InvalidChoiceException : Exception
    {
        public InvalidChoiceException()
        {
        }

        public InvalidChoiceException(string message) : base(message)
        {
        }

        public InvalidChoiceException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected InvalidChoiceException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}