create proc upvote(
    @vid varchar(255),
    @uid varchar(255),
    @aid varchar(255)
)
AS
BEGIN
   
    IF NOT EXISTS (SELECT 1 FROM Users WHERE uid = @uid)
    BEGIN
        INSERT INTO Votes (vid, aid, uid, type)
        VALUES (NEWID(), @aid, @uid, 1)
    END
END