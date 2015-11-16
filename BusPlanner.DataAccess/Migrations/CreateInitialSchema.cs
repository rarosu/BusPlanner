using FluentMigrator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusPlanner.DataAccess.Migrations
{
    [Migration(1)]
    public class CreateInitialSchema : Migration
    {
        public override void Up()
        {
            Create.Table("Zones")
                .WithColumn("Id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("UserFriendlyName").AsString(128).NotNullable().WithDefaultValue("Unnamed Zone");
            Create.Table("Stops")
                .WithColumn("Id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("UserFriendlyName").AsString(128).NotNullable().WithDefaultValue("Unnamed Stop")
                .WithColumn("Latitude").AsFloat().NotNullable()
                .WithColumn("Longitude").AsFloat().NotNullable()
                .WithColumn("ZoneId").AsInt32().NotNullable();
            Create.Table("Connections")
                .WithColumn("Id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("TravelTime").AsDateTime().NotNullable()
                .WithColumn("FirstStopId").AsInt32().NotNullable()
                .WithColumn("SecondStopId").AsInt32().NotNullable();
            Create.Table("ConnectionPathPoints")
                .WithColumn("Id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("Latitude").AsFloat().NotNullable()
                .WithColumn("Longitude").AsFloat().NotNullable()
                .WithColumn("ConnectionId").AsInt32().NotNullable();
            Create.Table("Routes")
                .WithColumn("RouteNumber").AsInt32().NotNullable().PrimaryKey().Identity();
            Create.Table("RouteConnections")
                .WithColumn("RouteId").AsInt32().NotNullable()
                .WithColumn("ConnectionId").AsInt32().NotNullable()
                .WithColumn("DrivingOrder").AsInt32().NotNullable();
            Create.Table("ScheduledRoutes")
                .WithColumn("Id").AsInt32().NotNullable().PrimaryKey().Identity()
                .WithColumn("DepartureTimeFromFirstStop").AsDateTime().NotNullable()
                .WithColumn("Periodicity").AsInt32().NotNullable()
                .WithColumn("RouteId").AsInt32().NotNullable();

            Create.PrimaryKey("PK_RouteConnections").OnTable("RouteConnections").Columns(new string[] { "RouteId", "ConnectionId" });

            Create.ForeignKey("FK_Stops_ZoneId").FromTable("Stops").ForeignColumn("ZoneId").ToTable("Zones").PrimaryColumn("Id");
            Create.ForeignKey("FK_Connections_FirstStopId").FromTable("Connections").ForeignColumn("FirstStopId").ToTable("Stops").PrimaryColumn("Id");
            Create.ForeignKey("FK_Connections_SecondStopId").FromTable("Connections").ForeignColumn("SecondStopId").ToTable("Stops").PrimaryColumn("Id");
            Create.ForeignKey("FK_ConnectionPathPoints_ConnectionId").FromTable("ConnectionPathPoints").ForeignColumn("ConnectionId").ToTable("Connections").PrimaryColumn("Id");
            Create.ForeignKey("FK_RouteConnections_RouteId").FromTable("RouteConnections").ForeignColumn("RouteId").ToTable("Routes").PrimaryColumn("Id");
            Create.ForeignKey("FK_RouteConnections_ConnectionId").FromTable("RouteConnections").ForeignColumn("ConnectionId").ToTable("Connections").PrimaryColumn("Id");
            Create.ForeignKey("FK_ScheduledRoutes_RouteId").FromTable("ScheduledRoutes").ForeignColumn("RouteId").ToTable("Routes").PrimaryColumn("Id");
        }

        public override void Down()
        {
            Delete.ForeignKey("FK_Stops_ZoneId").OnTable("Stops");
            Delete.ForeignKey("FK_Connections_FirstStopId").OnTable("Connections");
            Delete.ForeignKey("FK_Connections_SecondStopId").OnTable("Connections");
            Delete.ForeignKey("FK_ConnectionPathPoints_ConnectionId").OnTable("ConnectionPathPoints");
            Delete.ForeignKey("FK_RouteConnections_RouteId").OnTable("RouteConnections");
            Delete.ForeignKey("FK_RouteConnections_ConnectionId").OnTable("RouteConnections");
            Delete.ForeignKey("FK_ScheduledRoutes_RouteId").OnTable("ScheduledRoutes");

            Delete.Table("Zones");
            Delete.Table("Stops");
            Delete.Table("Connections");
            Delete.Table("ConnectionPathPoints");
            Delete.Table("Routes");
            Delete.Table("RouteConnections");
            Delete.Table("ScheduledRoute");
        }
    }
}
