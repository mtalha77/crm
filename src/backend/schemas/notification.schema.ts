import mongoose from 'mongoose'
import { NotificationType } from 'src/shared/enums/NotificationType.enum'

const notificationSchema = new mongoose.Schema(
  {
    message: { type: String, required: false },
    for_user_ids: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      required: false
    },
    ticket_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessTicket', required: false },
    created_by_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    category: { type: String, enum: ['Business', 'Departmental'], required: true },
    type: { type: String, enum: NotificationType, required: true },
    for_department_ids: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Department',
      required: false
    },
    read: { type: Boolean, required: true, default: false }
  },
  { timestamps: true }
)

const NotificationModel = mongoose.models.Notification || mongoose.model('Notification', notificationSchema)

export default NotificationModel
