using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BusPlanner.API.App_Start
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            // Globally enable cross-origin requests.
            //config.EnableCors(new EnableCorsAttribute(origins: "http://localhost:65112", headers: "*", methods: "*"));
            config.EnableCors(new EnableCorsAttribute(origins: "*", headers: "*", methods: "*"));

            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
        }
    }
}
