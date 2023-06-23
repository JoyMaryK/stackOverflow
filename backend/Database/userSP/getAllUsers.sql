create procedure getAllUsers 

AS
BEGIN 
 SELECT *
    FROM Users
    WHERE isDeleted = 0
    ORDER BY username
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY
END