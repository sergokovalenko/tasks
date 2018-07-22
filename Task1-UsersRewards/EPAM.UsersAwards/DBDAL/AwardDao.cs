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
    public class AwardDao : IAwardDal
    {
        private DBDalConfig config;

        public AwardDao(DBDalConfig config)
        {
            this.config = config;
        }

        public int AddAward(AwardDTO award)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[Award.AddAward]", connection);

                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@Title", award.Title)
                {
                    Direction = ParameterDirection.Input
                });
                command.Parameters.Add(new SqlParameter("@Description", award.Description)
                {
                    Direction = ParameterDirection.Input
                });
                command.Parameters.Add(new SqlParameter("@ImageId", award.ImageId)
                {
                    Direction = ParameterDirection.Input
                });

                connection.Open();
                int id = (int)(decimal)command.ExecuteScalar();

                return id;
            }
        }

        public bool DeleteAward(int awardId)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[Award.DeleteAward]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@Id", awardId)
                {
                    Direction = ParameterDirection.Input
                });

                connection.Open();
                int countRow = command.ExecuteNonQuery();

                return countRow > 0;
            }
        }

        public IEnumerable<AwardDTO> GetAllAwards()
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[Awards.GetAll]", connection);
                command.CommandType = CommandType.StoredProcedure;
                connection.Open();
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    string description = reader["Description"] == DBNull.Value ? "" : (string)reader["Description"];

                    yield return new AwardDTO()
                    {
                        Id = (int)reader["Id"],
                        Title = (string)reader["Title"],
                        Description = description,
                        ImageId = (Guid)reader["ImageId"],
                    };
                }
            }
        }

        public AwardDTO GetAwardById(int id)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[Award.GetById]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@Id", id)
                {
                    Direction = ParameterDirection.Input
                });

                connection.Open();
                var reader = command.ExecuteReader();

                if (reader.Read())
                {
                    string description = reader["Description"] == DBNull.Value ? "" : (string)reader["Description"];

                    return new AwardDTO()
                    {
                        Id = (int)reader["Id"],
                        Title = (string)reader["Title"],
                        Description = description,
                        ImageId = (Guid)reader["ImageId"]
                    };
                }

                return null;
            }
        }

        public bool UpdateAward(AwardDTO updatedAward)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[Award.UpdateAward]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@Id", updatedAward.Id)
                {
                    Direction = ParameterDirection.Input
                });
                command.Parameters.Add(new SqlParameter("@Title", updatedAward.Title)
                {
                    Direction = ParameterDirection.Input
                });
                command.Parameters.Add(new SqlParameter("@Description", updatedAward.Description)
                {
                    Direction = ParameterDirection.Input
                });
                command.Parameters.Add(new SqlParameter("@ImageId", updatedAward.ImageId)
                {
                    Direction = ParameterDirection.Input
                });

                connection.Open();
                int countRow = command.ExecuteNonQuery();

                return countRow > 0;
            }
        }

        public IEnumerable<AwardDTO> GetAwardsForUser(int userId)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[UsersAwards.GetUserAwards]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@UserId", userId)
                {
                    Direction = ParameterDirection.Input
                });

                connection.Open();
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    yield return new AwardDTO()
                    {
                        Id = (int)reader["Id"],
                        Title = (string)reader["Title"],
                        Description = (string)reader["Description"],
                        ImageId = (Guid)reader["ImageId"]
                    };
                }
            }
        }

        public IEnumerable<AwardDTO> GetFreeAwardsForUser(int userId)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[UsersAwards.GetFreeUserAwards]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@UserId", userId)
                {
                    Direction = ParameterDirection.Input
                });

                connection.Open();
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    yield return new AwardDTO()
                    {
                        Id = (int)reader["Id"],
                        Title = (string)reader["Title"],
                        Description = (string)reader["Description"],
                        ImageId = (Guid)reader["ImageId"]
                    };
                }
            }
        }

        public AwardDTO GetAwardByName(string name)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = new SqlCommand("[dbo].[Award.GetByName]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@title", name)
                {
                    Direction = ParameterDirection.Input
                });

                connection.Open();
                var reader = command.ExecuteReader();

                if (reader.Read())
                {
                    return new AwardDTO()
                    {
                        Id = (int)reader["Id"],
                        Title = (string)reader["Title"],
                        Description = (string)reader["Description"],
                        ImageId = (Guid)reader["ImageId"]
                    };
                }

                return null;
            }
        }

        public IEnumerable<AwardDTO> GetAwardsByFirstLetter(char letter)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = new SqlCommand("[Award.GetAllWithFirstLetter]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@symbol", letter)
                {
                    Direction = ParameterDirection.Input
                });
                connection.Open();
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    yield return new AwardDTO()
                    {
                        Id = (int)reader["Id"],
                        Title = (string)reader["Title"],
                        Description = (string)reader["Description"],
                        ImageId = (Guid)reader["ImageId"]
                    };
                }
            }
        }

        public IEnumerable<AwardDTO> GetAwardsContains(string text)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = new SqlCommand("[Award.GetAllWithText]", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@text", text)
                {
                    Direction = ParameterDirection.Input
                });
                connection.Open();
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    yield return new AwardDTO()
                    {
                        Id = (int)reader["Id"],
                        Title = (string)reader["Title"],
                        Description = (string)reader["Description"],
                        ImageId = (Guid)reader["ImageId"]
                    };
                }
            }
        }
    }
}
