import NotificationsListItem from "./NotificationsListItem"
import { useState, useEffect } from 'react';
import { getNotifications } from '../services/notificationService';
// import { getMeals } from '../services/mealService';


export default function NotificationsList() {
  let [notifications, setNotifications] = useState([]);
  // let [meals, setMeals] = useState([]);


  useEffect(() => {
    getNotifications().then(result => {
      if (result) {
        setNotifications(result.sort((a, b) => b.date - a.date)); // show newest first
      }
    })
    /// Warning!!!! This causes infinite loop
    // getMeals().then(result => {
    //   if (result)
    //     console.log(result);
    //     setMeals(result)
    // })
  }, []);

  return (
    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
      <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-overflow">
        <h2 className="tm-block-title">Notification List</h2>
        <div className="tm-notification-items">
          {notifications.length > 0 && notifications.map(notification =>
            <NotificationsListItem key={notification._id}
                          notification={notification}
            />)}

        </div>
      </div>
    </div>
  );
}