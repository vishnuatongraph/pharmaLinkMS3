// query for creating the supabase rpc for fetching all the pending messages for a user for all of its chats

/* 
  create
or replace function get_unread_counts (user_id integer)
RETURNS TABLE (
    "SupabaseUsers_id" bigint,
    unread_count bigint
) AS $$
BEGIN
    RETURN QUERY (
        SELECT
  senders."id",
  COUNT("SupabaseMessages"."senderId") AS unread_count
FROM
  (
    SELECT DISTINCT "id","Name"
    FROM "SupabaseUsers"
    where "id" != user_id
  ) AS senders
LEFT JOIN
  "SupabaseMessages"
ON
  senders."id" = "SupabaseMessages"."senderId" AND
  "SupabaseMessages"."receiverId" = user_id AND
  "SupabaseMessages"."isRead" = false
GROUP BY
  senders."id"
    );
END;
$$ language plpgsql;
*/


// query to create a function that gets latest messages of each chat

/* 
  CREATE OR REPLACE FUNCTION get_users_with_latest_message(user_id integer)
RETURNS TABLE (
    "Id" bigint,
    "Name" TEXT,
    "profileUrl" TEXT,
    "latestMessageId" bigint,
    "latestMessageSenderId" bigint,
    "latestMessageReciverId" bigint,
    "latestMessageContent" TEXT,
    "latestMessageCreatedAt" TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY (
        SELECT
            CASE
                WHEN "senderId" = user_id THEN "receiverId"
                WHEN "receiverId" = user_id THEN "senderId"
            END AS userId,
            u."Name" AS Name,
            u."profileUrl" As profileUrl,
            m."id" AS latestMessageId,
            m."senderId" AS latestMessageSenderId,
            m."receiverId" AS latestMessageReceiverId,
            m."content" AS latestMessageContent,
            m."created_at" AS latestMessageCreatedAt
        FROM (
            SELECT
                "id",
                "senderId",
                "receiverId",
                "content",
                "created_at",
                ROW_NUMBER() OVER (PARTITION BY CASE
                                    WHEN "senderId" = user_id THEN "receiverId"
                                    WHEN "receiverId" = user_id THEN "senderId"
                                    END
                                    ORDER BY "created_at" DESC) AS row_num
            FROM "SupabaseMessages"
            WHERE "senderId" = user_id OR "receiverId" = user_id
        ) AS m
        LEFT JOIN "SupabaseUsers" AS u ON (
            CASE
                WHEN m."senderId" = user_id THEN m."receiverId"
                WHEN m."receiverId" = user_id THEN m."senderId"
            END) = u."id"
        WHERE row_num = 1 and
        u."id" != user_id
        ORDER BY m."created_at" DESC -- Sort records by the latest created_at timestamp
    );
END;
$$ LANGUAGE plpgsql;

*/