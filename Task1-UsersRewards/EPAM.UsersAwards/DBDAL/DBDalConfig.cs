namespace DBDAL
{
    public class DBDalConfig
    {
        public string ConnectionString { get; set; }

        public DBDalConfig(string connectionString)
        {
            this.ConnectionString = connectionString;
        }
    }
}