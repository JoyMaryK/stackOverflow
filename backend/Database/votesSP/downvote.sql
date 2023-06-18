create proc downvote(
    @vid varchar(255),
    @uid varchar(255),
    @aid varchar(255)
)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Votes WHERE aid = @aid AND uid = @uid)
    BEGIN
        UPDATE Votes SET type = 0 WHERE aid = @aid AND uid = @uid
    END
    ELSE
    BEGIN
        INSERT INTO Votes (aid, uid, type) VALUES (@aid, @uid, 0)
    END
END