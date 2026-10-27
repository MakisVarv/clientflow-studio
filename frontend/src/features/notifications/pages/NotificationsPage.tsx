import { useState } from 'react';
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  MailOpen,
} from 'lucide-react';

import {
  useNotifications,
  useUnreadNotifications,
  useMarkNotificationAsRead,
  useMarkNotificationAsUnread,
  useMarkAllNotificationsAsRead,
  useDeleteNotification,
} from '../hooks/useNotifications';

import type { Notification } from '../types/notification.types';

type Tab = 'all' | 'unread';

function NotificationsPage() {
  const [tab, setTab] = useState<Tab>('all');

  const { data: allNotifications = [], isLoading: loadingAll } =
    useNotifications();

  const { data: unreadNotifications = [], isLoading: loadingUnread } =
    useUnreadNotifications();

  const markAsRead = useMarkNotificationAsRead();

  const markAsUnread = useMarkNotificationAsUnread();

  const markAllAsRead = useMarkAllNotificationsAsRead();

  const deleteNotification = useDeleteNotification();

  const notifications =
    tab === 'all' ? allNotifications : unreadNotifications;

  const isLoading = tab === 'all' ? loadingAll : loadingUnread;

  function getTypeStyles(notification: Notification) {
    switch (notification.type) {
      case 'SUCCESS':
        return 'bg-green-100 text-green-700';

      case 'WARNING':
        return 'bg-yellow-100 text-yellow-700';

      case 'ERROR':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-blue-100 text-blue-700';
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Notifications
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and manage your notifications.
          </p>
        </div>

        {unreadNotifications.length > 0 && (
          <button
            type="button"
            onClick={() => markAllAsRead.mutate()}
            className="
              flex
              items-center
              gap-2
              rounded-lg
              bg-blue-600
              px-4
              py-2
              text-sm
              font-medium
              text-white
              transition
              hover:bg-blue-700
            "
          >
            <CheckCheck size={18} />
            Mark all as read
          </button>
        )}
      </div>

      <div className="mb-5 flex gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setTab('all')}
          className={`
            border-b-2
            px-4
            py-3
            text-sm
            font-medium
            transition

            ${
              tab === 'all'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }
          `}
        >
          All
        </button>

        <button
          type="button"
          onClick={() => setTab('unread')}
          className={`
            flex
            items-center
            gap-2
            border-b-2
            px-4
            py-3
            text-sm
            font-medium
            transition

            ${
              tab === 'unread'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }
          `}
        >
          Unread
          {unreadNotifications.length > 0 && (
            <span
              className="
                rounded-full
                bg-red-500
                px-2
                py-0.5
                text-xs
                text-white
              "
            >
              {unreadNotifications.length}
            </span>
          )}
        </button>
      </div>

      {isLoading && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
          Loading notifications...
        </div>
      )}

      {!isLoading && notifications.length === 0 && (
        <div
          className="
              flex
              flex-col
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              py-16
            "
        >
          <Bell size={40} className="mb-3 text-slate-300" />

          <p className="font-medium text-slate-700">
            No notifications
          </p>

          <p className="mt-1 text-sm text-slate-400">
            You are all caught up.
          </p>
        </div>
      )}

      {!isLoading && notifications.length > 0 && (
        <div
          className="
              overflow-hidden
              rounded-xl
              border
              border-slate-200
              bg-white
            "
        >
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`
                    flex
                    items-start
                    gap-4
                    border-b
                    border-slate-100
                    p-5
                    transition
                    last:border-b-0
                    hover:bg-slate-50

                    ${!notification.is_read ? 'bg-blue-50/40' : ''}
                  `}
            >
              <div
                className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      ${getTypeStyles(notification)}
                    `}
              >
                <Bell size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3
                        className={`
                              text-sm
                              text-slate-900

                              ${
                                !notification.is_read
                                  ? 'font-semibold'
                                  : 'font-medium'
                              }
                            `}
                      >
                        {notification.title}
                      </h3>

                      {!notification.is_read && (
                        <span
                          className="
                                h-2
                                w-2
                                rounded-full
                                bg-blue-500
                              "
                        />
                      )}
                    </div>

                    <p className="mt-1 text-sm text-slate-600">
                      {notification.message}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      {new Date(
                        notification.created_at,
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {!notification.is_read ? (
                      <button
                        type="button"
                        title="Mark as read"
                        onClick={() =>
                          markAsRead.mutate(notification.id)
                        }
                        className="
                              rounded-lg
                              p-2
                              text-slate-500
                              transition
                              hover:bg-green-50
                              hover:text-green-600
                            "
                      >
                        <Check size={18} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        title="Mark as unread"
                        onClick={() =>
                          markAsUnread.mutate(notification.id)
                        }
                        className="
                              rounded-lg
                              p-2
                              text-slate-500
                              transition
                              hover:bg-blue-50
                              hover:text-blue-600
                            "
                      >
                        <MailOpen size={18} />
                      </button>
                    )}

                    <button
                      type="button"
                      title="Delete"
                      onClick={() =>
                        deleteNotification.mutate(notification.id)
                      }
                      className="
                            rounded-lg
                            p-2
                            text-slate-500
                            transition
                            hover:bg-red-50
                            hover:text-red-600
                          "
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationsPage;
