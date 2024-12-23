package com.tubesbookwise.Service;

import com.tubesbookwise.Models.Notification;
import com.tubesbookwise.Models.User;
import com.tubesbookwise.Repository.NotificationRepository;
import com.tubesbookwise.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationsService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Autowired
    public NotificationsService(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    public List<Notification> getNotificationsByUserId(String userId) {
        return notificationRepository.findByUserId(userId);
    }

    // Method to add a new notification
    public Notification addNotification(User user, String title, String message, Notification.NotificationType type) {
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(type);
        notification.setDate(LocalDateTime.now());
        notification.setRead(false);

        return notificationRepository.save(notification);
    }

    // Method to update notification status to "read"
    public Notification markAsRead(String notificationId) {
        Optional<Notification> optionalNotification = notificationRepository.findById(notificationId);

        if (optionalNotification.isPresent()) {
            Notification notification = optionalNotification.get();
            notification.setRead(true);
            return notificationRepository.save(notification);
        } else {
            throw new IllegalArgumentException("Notification with ID " + notificationId + " not found");
        }
    }

    // Method to fetch a user by ID
    public User getUserById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " not found"));
    }


    // Method to delete a notification by ID
    public void deleteNotification(String notifId) {
        if (notificationRepository.existsById(notifId)) {
            notificationRepository.deleteById(notifId);
        } else {
            throw new IllegalArgumentException("Notification with ID " + notifId + " not found");
        }
    }
}
