CREATE PROCEDURE [dbo].[spUsers_Authenticate]
    @userName NVARCHAR(16),
    @password NVARCHAR(16)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT [Id], [UserName], [FirstName], [LastName], [Password]
    FROM dbo.Users
    WHERE UserName = @userName
      AND [Password] = @password;
END