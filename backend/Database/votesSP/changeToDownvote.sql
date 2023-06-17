create proc changeToDownvote(
    @vid varchar(255),
    @uid varchar(255)
)
AS
    BEGIN
        update Votes set type=0 where vid=@vid and uid=@uid

END