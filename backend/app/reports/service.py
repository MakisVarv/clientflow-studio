from app.reports.repository import ReportsRepository


class ReportsService:

    def __init__(self, repository: ReportsRepository):

        self.repository = repository

    def dashboard_report(self):

        return {
            "summary": {
                "companies": self.repository.total_companies(),
                "contacts": self.repository.total_contacts(),
                "leads": self.repository.total_leads(),
                "deals": self.repository.total_deals(),
                "tasks": self.repository.total_tasks(),
                "activities": self.repository.total_activities(),
                "calendar_events": self.repository.total_events(),
                "users": self.repository.total_users(),
            }
        }

    def sales_report(self):

        won = self.repository.won_deals()

        lost = self.repository.lost_deals()

        total = won + lost

        conversion_rate = 0

        if total > 0:

            conversion_rate = round(
                (won / total) * 100,
                2,
            )

        return {
            "summary": {
                "total_sales": float(self.repository.total_sales()),
                "average_deal": float(self.repository.average_deal()),
                "won_deals": won,
                "lost_deals": lost,
                "open_deals": self.repository.open_deals(),
                "conversion_rate": conversion_rate,
            }
        }

    def lead_funnel_report(self):

        return {"lead_funnel": self.repository.leads_by_status()}

    def task_report(self):

        return {
            "tasks": {
                "completed": self.repository.completed_tasks(),
                "pending": self.repository.pending_tasks(),
            }
        }

    def full_report(self):

        won = self.repository.won_deals()

        lost = self.repository.lost_deals()

        total = won + lost

        conversion_rate = 0

        if total > 0:

            conversion_rate = round(
                (won / total) * 100,
                2,
            )

        return {
            "dashboard": {
                "companies": self.repository.total_companies(),
                "contacts": self.repository.total_contacts(),
                "leads": self.repository.total_leads(),
                "deals": self.repository.total_deals(),
                "tasks": self.repository.total_tasks(),
                "activities": self.repository.total_activities(),
                "calendar_events": self.repository.total_events(),
                "users": self.repository.total_users(),
            },
            "sales": {
                "total_sales": float(self.repository.total_sales()),
                "average_deal": float(self.repository.average_deal()),
                "won_deals": won,
                "lost_deals": lost,
                "open_deals": self.repository.open_deals(),
                "conversion_rate": conversion_rate,
            },
            "lead_funnel": self.repository.leads_by_status(),
            "tasks": {
                "completed": self.repository.completed_tasks(),
                "pending": self.repository.pending_tasks(),
            },
        }
