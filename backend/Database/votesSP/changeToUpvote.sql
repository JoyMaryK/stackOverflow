create proc changeToUpvote(
    @vid varchar(255),
    @uid varchar(255)
)
AS
    BEGIN
        update Votes set type=1 where vid=@vid and uid=@uid

END