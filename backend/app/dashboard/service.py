from app.dashboard.repository import DashboardRepository


class DashboardService:

    def __init__(self, repository: DashboardRepository):

        self.repository = repository

    def get_dashboard(self):

        return {
            "companies": self.repository.total_companies(),
            "contacts": self.repository.total_contacts(),
            "leads": self.repository.total_leads(),
            "deals": self.repository.total_deals(),
            "activities": self.repository.total_activities(),
            "tasks": self.repository.total_tasks(),
            "completed_tasks": self.repository.completed_tasks(),
            "pending_tasks": self.repository.pending_tasks(),
            "lead_status": self.repository.leads_by_status(),
            "deal_stage": self.repository.deals_by_stage(),
            "activity_type": self.repository.activities_by_type(),
            "total_sales": float(self.repository.total_sales()),
            "average_deal": float(self.repository.average_deal()),
        }
