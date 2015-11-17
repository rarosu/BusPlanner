echo "NOTE - The database must exist before running migrations."
packages\FluentMigrator.1.6.1\tools\Migrate.exe /connectionStringConfigPath BusPlanner.API/Web.config /connectionString BusPlanner /provider sqlserver2014 /assembly BusPlanner.DataAccess/bin/Debug/BusPlanner.DataAccess.dll
pause