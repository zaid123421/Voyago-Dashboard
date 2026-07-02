import { useQuery } from '@tanstack/react-query';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import { dashboardApi, visitorStats } from '@/api/endpoints';
import { LoadingSpinner, ErrorState } from '@/shared/components/Feedback';
import { renderStars } from '@/shared/utils';
import { DashboardChart } from '@/features/dashboard/components/VisitorsChart';

export function DashboardPage() {
  const overview = useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: async () => (await dashboardApi.getOverview()).data.data,
  });
  const topTrips = useQuery({
    queryKey: ['dashboard', 'top-trips'],
    queryFn: async () => (await dashboardApi.getTopTrips()).data.data.result,
  });
  const topDestinations = useQuery({
    queryKey: ['dashboard', 'top-destinations'],
    queryFn: async () => (await dashboardApi.getTopDestinations()).data.data.result,
  });

  if (overview.isLoading) {
    return (
      <DashboardLayout activeNav={1}>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  if (overview.isError) {
    return (
      <DashboardLayout activeNav={1}>
        <ErrorState onRetry={() => overview.refetch()} />
      </DashboardLayout>
    );
  }

  const stats = overview.data!;

  return (
    <DashboardLayout activeNav={1}>
      <div className="overview-first-box">
        <div className="overview-content-1">
          <h4 className="mb-20">Total Users</h4>
          <div className="overview-box-content">
            <h2>{stats.total_users}</h2>
            <i className="fa-solid fa-users" />
          </div>
        </div>
        <div className="overview-content-2">
          <h4 className="mb-20">Total Bookings</h4>
          <div className="overview-box-content">
            <h2>{stats.total_booking}</h2>
            <i className="fa-solid fa-money-check" />
          </div>
        </div>
        <div className="overview-content-3">
          <h4 className="mb-20">Today&apos;s New Users</h4>
          <div className="overview-box-content">
            <h2>{stats.todayUsers}</h2>
            <i className="fa-solid fa-user-plus" />
          </div>
        </div>
        <div className="overview-content-4">
          <h4 className="mb-20">Today&apos;s New Bookings</h4>
          <div className="overview-box-content">
            <h2>{stats.todayBookings}</h2>
            <i className="fa-solid fa-money-check" />
          </div>
        </div>
      </div>
      <div className="overview-second-box mt-25">
        <div className="overview-content-5">
          <DashboardChart data={visitorStats} />
        </div>
      </div>
      <div className="overview-third-box mt-25">
        <div className="overview-content-7">
          <h2 className="mb-30">Top Trips</h2>
          <table className="top-trips-table">
            <thead>
              <tr>
                <th className="fw-300">#</th>
                <th className="fw-300">Name</th>
                <th className="fw-300">Reviews</th>
                <th className="fw-300">Bookings</th>
              </tr>
            </thead>
            <tbody>
              {topTrips.data?.map((trip, index) => (
                <tr key={trip.name}>
                  <td className="fw-300">{index + 1}</td>
                  <td className="fw-300"><p>{trip.name}</p></td>
                  <td>
                    <div className="d-flex justify-c">
                      {Array.from({ length: renderStars(trip.rate) }).map((_, i) => (
                        <i key={i} className="fa-solid fa-star" />
                      ))}
                    </div>
                  </td>
                  <td className="fw-300"><span>{trip.bookings}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="overview-content-8">
          <h2 className="mb-30">Top Destinations</h2>
          <table className="top-trips-table">
            <thead>
              <tr>
                <th className="fw-300">#</th>
                <th className="fw-300">Name</th>
                <th className="fw-300">Reviews</th>
              </tr>
            </thead>
            <tbody>
              {topDestinations.data?.map((dest, index) => (
                <tr key={dest.name}>
                  <td className="fw-300">{index + 1}</td>
                  <td className="fw-300"><p>{dest.name}</p></td>
                  <td>
                    <div>
                      {Array.from({ length: renderStars(dest.rate) }).map((_, i) => (
                        <i key={i} className="fa-solid fa-star" />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
