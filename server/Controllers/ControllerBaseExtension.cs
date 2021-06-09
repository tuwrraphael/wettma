using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using System.Linq;

namespace Wettma.Controllers
{
    public static class ControllerBaseExtension
    {
        public static async Task StreamArray<T>(this ControllerBase controller, Utf8JsonWriter jsonWriter, TextWriter textWriter, IAsyncEnumerable<T> objects)
        {
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            };
            var first = true;
            jsonWriter.WriteStartArray();
            await jsonWriter.FlushAsync();
            await foreach (var game in objects)
            {
                if (!first)
                {
                    await textWriter.WriteAsync(",");
                    await textWriter.FlushAsync();
                }
                first = false;
                await JsonSerializer.SerializeAsync(controller.Response.Body, game, options);
            }
            jsonWriter.WriteEndArray();
        }

        public static UserId GetUserId(this ControllerBase controller)
        {
            if (null != controller.User?.Identities)
            {
                var identity = controller.User.Identities.Where(i => i.AuthenticationType == "wettma").SingleOrDefault();
                if (null != identity)
                {
                    return new UserId(identity.Name);
                }
            }
            return null;
        }
    }
}
