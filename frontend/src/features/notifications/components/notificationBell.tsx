import { useState } from 'react';
import { Bell, CheckCheck, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
  useNotifications,
  useUnreadCount,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
  useDeleteNotification,
} from '../hooks/useNotifications';

export default function NotificationBell() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { data: notifications = [] } = useNotifications();

  const { data: unreadCount = 0 } = useUnreadCount();

  const markAsRead = useMarkNotificationAsRead();

  const markAllAsRead = useMarkAllNotificationsAsRead();

  const deleteNotification = useDeleteNotification();

  const recentNotifications = notifications.slice(0, 6);

  function handleNotificationClick(id: string, isRead: boolean) {
    if (!isRead) {
      markAsRead.mutate(id);
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          relative
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          text-gray-600
          transition
          hover:bg-gray-100
          hover:text-gray-900
        "
      >
        <Bell size={22} />

        {unreadCount > 0 && (
          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              min-h-5
              min-w-5
              items-center
              justify-center
              rounded-full
              bg-red-500
              px-1
              text-[11px]
              font-bold
              text-white
            "
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            z-50
            mt-2
            w-96
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-white
            shadow-xl
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-gray-200
              px-4
              py-3
            "
          >
            <div>
              <h3
                className="
                  text-base
                  font-semibold
                  text-gray-900
                "
              >
                Notifications
              </h3>

              <p
                className="
                  text-xs
                  text-gray-500
                "
              >
                {unreadCount} unread
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={() => markAllAsRead.mutate()}
                className="
                  flex
                  items-center
                  gap-1
                  text-sm
                  font-medium
                  text-blue-600
                  hover:text-blue-800
                "
              >
                <CheckCheck size={16} />
                Mark all read
              </button>
            )}
          </div>

          <div
            className="
              max-h-105
              overflow-y-auto
            "
          >
            {recentNotifications.length === 0 && (
              <div
                className="
                  px-4
                  py-10
                  text-center
                  text-sm
                  text-gray-500
                "
              >
                No notifications.
              </div>
            )}

            {recentNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() =>
                  handleNotificationClick(
                    notification.id,
                    notification.is_read,
                  )
                }
                className={`
                    group
                    flex
                    cursor-pointer
                    gap-3
                    border-b
                    border-gray-100
                    px-4
                    py-3
                    transition
                    hover:bg-gray-50

                    ${
                      !notification.is_read
                        ? 'bg-blue-50/60'
                        : 'bg-white'
                    }
                  `}
              >
                <div
                  className={`
                      mt-2
                      h-2
                      w-2
                      shrink-0
                      rounded-full

                      ${
                        notification.is_read
                          ? 'bg-gray-300'
                          : 'bg-blue-500'
                      }
                    `}
                />

                <div className="min-w-0 flex-1">
                  <div
                    className="
                        flex
                        items-start
                        justify-between
                        gap-2
                      "
                  >
                    <p
                      className={`
                          truncate
                          text-sm
                          text-gray-900

                          ${
                            !notification.is_read
                              ? 'font-semibold'
                              : 'font-medium'
                          }
                        `}
                    >
                      {notification.title}
                    </p>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();

                        deleteNotification.mutate(notification.id);
                      }}
                      className="
                          opacity-0
                          text-gray-400
                          transition
                          hover:text-red-500
                          group-hover:opacity-100
                        "
                    >
                      <X size={15} />
                    </button>
                  </div>

                  <p
                    className="
                        mt-1
                        line-clamp-2
                        text-xs
                        text-gray-600
                      "
                  >
                    {notification.message}
                  </p>

                  <p
                    className="
                        mt-2
                        text-[11px]
                        text-gray-400
                      "
                  >
                    {new Date(
                      notification.created_at,
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setOpen(false);

              navigate('/notifications');
            }}
            className="
              w-full
              border-t
              border-gray-200
              px-4
              py-3
              text-center
              text-sm
              font-medium
              text-blue-600
              transition
              hover:bg-gray-50
            "
          >
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
}
