using DBDAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsersAward.DAL.AbstractDAL;
using UsersAward.Entities;

namespace UsersAward.Dal.DBDAL
{
    public class PictureDao : IPictureDal
    {
        private DBDalConfig config;

        public PictureDao(DBDalConfig config)
        {
            this.config = config;
        }

        public bool AddImage(ImageDTO img)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[Image.AddImage]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@OwnerId", img.OwnerId)
                {
                    Direction = ParameterDirection.Input
                });
                command.Parameters.Add(new SqlParameter("@Bytes", img.Data)
                {
                    Direction = ParameterDirection.Input
                });
                command.Parameters.Add(new SqlParameter("@DataType", img.Type)
                {
                    Direction = ParameterDirection.Input
                });

                connection.Open();
                int countRow = command.ExecuteNonQuery();

                return countRow > 0;
            }
        }

        public ImageDTO GetImageById(Guid id)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[Image.GetById]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@Id", id)
                {
                    Direction = ParameterDirection.Input
                });

                connection.Open();
                var reader = command.ExecuteReader();

                if (reader.Read())
                {
                    return new ImageDTO()
                    {
                        OwnerId = (Guid)reader["OwnerId"],
                        Data = (byte[])reader["Bytes"],
                        Type = (string)reader["Type"]
                    };
                }

                return null;
            }
        }

        public bool UpdateImage(ImageDTO img)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[Image.UpdateImage]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@OwnerId", img.OwnerId)
                {
                    Direction = ParameterDirection.Input
                });
                command.Parameters.Add(new SqlParameter("@Data", img.Data)
                {
                    Direction = ParameterDirection.Input
                });
                command.Parameters.Add(new SqlParameter("@DataType", img.Type)
                {
                    Direction = ParameterDirection.Input
                });
                connection.Open();

                int countRow = command.ExecuteNonQuery();

                return countRow > 0;
            }
        }

        public bool DeleteImage(Guid OwnerId)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[Image.Deleteimage]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@OwnerId", OwnerId)
                {
                    Direction = ParameterDirection.Input
                });
                connection.Open();
                int countRow = command.ExecuteNonQuery();

                return countRow > 0;
            }
        }
    }
}
