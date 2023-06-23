create proc upvote(
    @vid varchar(255),
    @uid varchar(255),
    @aid varchar(255)
)
AS
  IF EXISTS (SELECT 1 FROM Votes WHERE aid = @aid AND uid = @uid)
    BEGIN
        UPDATE Votes SET type = 1 WHERE aid = @aid AND uid = @uid
    END
    ELSE
    BEGIN
        INSERT INTO Votes (vid, aid, uid, type) VALUES (@vid, @aid,@uid, 1)
    END