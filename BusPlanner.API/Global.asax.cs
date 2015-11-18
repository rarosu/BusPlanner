using Autofac;
using Autofac.Integration.WebApi;
using BusPlanner.API.App_Start;
using BusPlanner.DataAccess;
using BusPlanner.ServiceLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Security;
using System.Web.SessionState;

namespace BusPlanner.API
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            // Setup dependency injection with Autofac.
            var config = GlobalConfiguration.Configuration;
            var builder = new ContainerBuilder();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterType<TripService>().As<ITripService>();
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>();
            builder.Register(t => new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["BusPlanner"].ConnectionString)).As<IDbConnection>();
            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);

            // Configure WebAPI.
            GlobalConfiguration.Configure(WebApiConfig.Register);   
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}