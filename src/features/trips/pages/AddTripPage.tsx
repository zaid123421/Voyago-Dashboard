import { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { tripsApi } from '@/api/endpoints';
import { DashboardLayout } from '@/shared/layouts/DashboardLayout';
import { LoadingSpinner } from '@/shared/components/Feedback';
import type { Attraction, Destination } from '@/shared/types';

interface TripEvent {
  action: string;
  title: string;
  attraction_id: string;
  start_date: string;
  duration: string;
  description: string;
  type: string;
  price_adult: string;
  price_child: string;
  additional_note: string;
}

const emptyEvent = (): TripEvent => ({
  action: '',
  title: '',
  attraction_id: '',
  start_date: '',
  duration: '',
  description: '',
  type: '',
  price_adult: '',
  price_child: '',
  additional_note: '',
});

const FEATURE_GROUPS = {
  Meals: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
  Transporting: ['Transporting', 'Airport/Station Transfer'],
  Fees: ['Taxes And Fees', 'Free Transporting', 'Entrance Fees to Attractions'],
  Services: [
    'Tour Guide',
    'Air Conditioning',
    'Free Wi-Fi',
    'Luggage Storage',
    'Travel Documentation Assisance',
  ],
  Activities: ['Activity Equipment', 'Family Friendly Activities', 'Photo/Video Package'],
};

export function AddTripPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [price, setPrice] = useState('');
  const [capacity, setCapacity] = useState(5);
  const [destinationId, setDestinationId] = useState('');
  const [description, setDescription] = useState('');
  const [meeting, setMeeting] = useState('');
  const [cancellationHours, setCancellationHours] = useState(1);
  const [images, setImages] = useState<File[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());
  const [days, setDays] = useState<TripEvent[][]>([[emptyEvent()]]);
  const [isDetailsSaved, setIsDetailsSaved] = useState(false);
  const [tripId, setTripId] = useState<number | null>(null);

  const destinations = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => (await tripsApi.getDestinations()).data.data as Destination[],
  });

  const attractions = useQuery({
    queryKey: ['attractions'],
    queryFn: async () => (await tripsApi.getAttractions()).data.data as Attraction[],
  });

  const createMutation = useMutation({
    mutationFn: () =>
      tripsApi.create({
        name,
        destination_id: Number(destinationId),
        start_date: startDate,
        end_date: startDate,
        trip_price: Number(price),
        capacity,
        duration: days.length,
        description,
        meeting_point_location: meeting,
        TimeLimitCancellation: cancellationHours,
        features: Array.from(selectedFeatures),
        days: days.map((day) =>
          day.map((event) => ({
            action: event.action,
            title: event.title,
            attraction_id: event.attraction_id ? Number(event.attraction_id) : null,
            start_date: event.start_date,
            duration: event.duration ? Number(event.duration) : null,
            description: event.description,
            type: event.type || null,
            price_adult: event.price_adult ? Number(event.price_adult) : null,
            price_child: event.price_child ? Number(event.price_child) : null,
            additional_note: event.additional_note,
          })),
        ),
      }),
    onSuccess: (res) => {
      const trip = res.data.data as { id: number };
      setTripId(trip.id);
      setIsDetailsSaved(true);
      toast.success('Trip details saved');
    },
    onError: () => toast.error('Failed to save trip details'),
  });

  const uploadMutation = useMutation({
    mutationFn: () => tripsApi.uploadImages(),
    onSuccess: () => {
      toast.success('Trip created');
      navigate('/trips');
    },
    onError: () => toast.error('Failed to upload images'),
  });

  function toggleFeature(feature: string) {
    setSelectedFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(feature)) next.delete(feature);
      else next.add(feature);
      return next;
    });
  }

  function handleAddDay() {
    setDays((prev) => [...prev, [emptyEvent()]]);
  }

  function handleAddEvent(dayIndex: number) {
    setDays((prev) => {
      const next = [...prev];
      next[dayIndex] = [...next[dayIndex], emptyEvent()];
      return next;
    });
  }

  function handleDeleteDay(dayIndex: number) {
    if (days.length <= 1) {
      toast.error('There must be at least one day.');
      return;
    }
    setDays((prev) => prev.filter((_, i) => i !== dayIndex));
  }

  function handleDeleteEvent(dayIndex: number, eventIndex: number) {
    setDays((prev) => {
      if (prev[dayIndex].length <= 1) {
        toast.error('In a day we must have at least one event');
        return prev;
      }
      const next = [...prev];
      next[dayIndex] = next[dayIndex].filter((_, i) => i !== eventIndex);
      return next;
    });
  }

  function handleEventChange(
    dayIndex: number,
    eventIndex: number,
    field: keyof TripEvent,
    value: string,
  ) {
    setDays((prev) => {
      const next = [...prev];
      next[dayIndex] = [...next[dayIndex]];
      next[dayIndex][eventIndex] = { ...next[dayIndex][eventIndex], [field]: value };
      return next;
    });
  }

  function handleSaveDetails(e: React.MouseEvent) {
    e.preventDefault();
    if (!name || !destinationId || !startDate || !price) {
      toast.error('Please fill trip name, destination, start date, and price');
      return;
    }
    createMutation.mutate();
  }

  function handleAddTrip(e: React.MouseEvent) {
    e.preventDefault();
    if (!isDetailsSaved || !tripId) return;
    uploadMutation.mutate();
  }

  if (destinations.isLoading || attractions.isLoading) {
    return (
      <DashboardLayout activeNav={4}>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeNav={4} className="add-trip-page">
      <div className="destination-details-header mb-15">
        <NavLink to="/trips">
          <i className="fa-solid fa-angle-left arrow-left transaction-arrow" />
        </NavLink>
        <h1 className="special-head-arrow special-head">Add A New Trip</h1>
      </div>

      <div className="mt-25 main-add-trip-box">
        <p className="fs-24">Add the trip&apos;s details</p>

        <div className="special-box add-trip-box">
          <div>
            <label>Trip Name</label>
            <input
              className="trip-name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Example: Sunset"
            />
          </div>
          <div className="mt-15">
            <label>Start Date</label>
            <input
              className="trip-name-input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              type="date"
            />
          </div>
          <div className="mt-15">
            <label>Price</label>
            <input
              className="trip-name-input"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Example: 350$"
            />
          </div>
          <div className="mt-15 capacity-div">
            <label>Capacity</label>
            <button type="button" onClick={() => setCapacity((c) => Math.max(5, c - 5))} className="bt mr-10">
              <i className="fa-solid fa-arrow-down" />
            </button>
            <div className="group">{capacity}</div>
            <button type="button" onClick={() => setCapacity((c) => c + 5)} className="bt ml-10">
              <i className="fa-solid fa-arrow-up" />
            </button>
          </div>
          <div className="div-select mt-15 position-relative">
            <label htmlFor="destination" className="fw-500">Destination</label>
            <div className="d-flex align-c">
              <select
                id="destination"
                className="cursor-p fs-15"
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
              >
                <option value="" disabled>Select Destination</option>
                {destinations.data?.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down arrow-select position-relative cursor-p" />
            </div>
          </div>
          <div className="mt-15 main-description">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain More About The Trip"
            />
          </div>
        </div>

        <div className="special-box images-card">
          <h3 className="fw-500 mb-20 mt-10 fs-16 ml-15">Upload Destination&apos;s Photos</h3>
          <input
            ref={fileInputRef}
            hidden
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files) setImages(Array.from(e.target.files));
            }}
          />
          <div className="cards-input" onClick={() => fileInputRef.current?.click()} role="presentation">
            <i className="fa-solid fa-cloud-arrow-up upload-icon" />
            <p>Upload Images</p>
          </div>
          <div className="images-container">
            {images.map((img, i) => (
              <div className="image-container" key={`${img.name}-${i}`}>
                <img src={URL.createObjectURL(img)} alt={img.name} />
              </div>
            ))}
          </div>
        </div>

        <p className="fs-24">What&apos;s included in the trip?</p>
        <div className="special-box features-box">
          {Object.entries(FEATURE_GROUPS).map(([group, items]) => (
            <div key={group}>
              <span className="position-relative fs-20">{group}:</span>
              <ul>
                {items.map((item) => (
                  <li key={item} className="mb-10">
                    <input
                      id={`feature-${item}`}
                      type="checkbox"
                      className="checkbox-special"
                      checked={selectedFeatures.has(item)}
                      onChange={() => toggleFeature(item)}
                    />
                    <label htmlFor={`feature-${item}`} className="checkbox-label cursor-p position-relative">
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="fs-24">Where is the meeting point?</p>
        <p className="fs-24">Edit trip&apos;s notes:</p>
        <div className="special-box meeting-box">
          <p className="mb-10">Here is the meeting point where all the travels should meet at.</p>
          <p>So, be careful when you adding this information</p>
          <textarea value={meeting} onChange={(e) => setMeeting(e.target.value)} />
        </div>

        <div className="special-box cancellation-box">
          <h3 className="fw-600">Cancellation</h3>
          <p className="ml-25 mt-5 position-relative">
            Up to
            <div className="mt-15 mb-15">
              <button type="button" onClick={() => setCancellationHours((h) => Math.max(1, h - 1))} className="bt ml-10">
                <i className="fa-solid fa-arrow-down" />
              </button>
              <div className="cancellation-hours">{cancellationHours}</div>
              <button type="button" onClick={() => setCancellationHours((h) => h + 1)} className="bt mr-10">
                <i className="fa-solid fa-arrow-up" />
              </button>
            </div>
            hour(s) before the trip&apos;s start time.
          </p>
          <p className="ml-25 mt-15 position-relative">
            This trip requires a minimum number of travelers. If it&apos;s canceled because the minimum
            isn&apos;t met, you&apos;ll be offered a different date/trip or a full refund.
          </p>
          <h3 className="mb-10 mt-20 fw-600">Traveler Information</h3>
          <p className="ml-25 position-relative">Adult Age: 15 - 60</p>
          <p className="ml-25 position-relative">Child Age: 5 - 14</p>
        </div>

        <p className="fs-24 span-2 mb-20">Itinerary of the trip</p>
      </div>

      <div>
        {days.map((day, dayIndex) => (
          <div className="day-box" key={dayIndex}>
            <div className="d-flex">
              <p className="fs-24 fw-bold">Day {dayIndex + 1}</p>
              <button type="button" className="delete-event" onClick={() => handleDeleteDay(dayIndex)}>
                <i className="fa-regular fa-trash-can" />
              </button>
            </div>
            <button type="button" onClick={() => handleAddEvent(dayIndex)}>Add Event</button>
            {day.map((event, eventIndex) => (
              <div className="event-box" key={eventIndex}>
                <div>
                  <h3 className="fw-600">Event {eventIndex + 1}:</h3>
                  <button type="button" className="delete-event" onClick={() => handleDeleteEvent(dayIndex, eventIndex)}>
                    <i className="fa-regular fa-trash-can" />
                  </button>
                </div>
                <div>
                  <label>Action:</label>
                  <input
                    placeholder="Action"
                    type="text"
                    value={event.action}
                    onChange={(e) => handleEventChange(dayIndex, eventIndex, 'action', e.target.value)}
                  />
                </div>
                <div>
                  <label>Title</label>
                  <input
                    placeholder="Title"
                    className="title-input"
                    value={event.title}
                    onChange={(e) => handleEventChange(dayIndex, eventIndex, 'title', e.target.value)}
                  />
                  <span>Or</span>
                </div>
                <div>
                  <label className="label-type position-relative">Attraction:</label>
                  <div className="d-flex align-c">
                    <select
                      className="ml-15 cursor-p"
                      value={event.attraction_id}
                      onChange={(e) => handleEventChange(dayIndex, eventIndex, 'attraction_id', e.target.value)}
                    >
                      <option value="" disabled>Select attraction</option>
                      {attractions.data?.map((a) => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </select>
                    <i className="fa-solid fa-chevron-down arrow-select position-relative cursor-p" />
                  </div>
                </div>
                <div>
                  <label>Start Date:</label>
                  <input
                    type="date"
                    value={event.start_date}
                    onChange={(e) => handleEventChange(dayIndex, eventIndex, 'start_date', e.target.value)}
                  />
                </div>
                <div>
                  <label>Duration:</label>
                  <input
                    placeholder="Duration Of The Trip"
                    type="text"
                    value={event.duration}
                    onChange={(e) => handleEventChange(dayIndex, eventIndex, 'duration', e.target.value)}
                  />
                </div>
                <div>
                  <label>Description:</label>
                  <textarea
                    className="ml-15"
                    placeholder="Add Some Words About The Trip."
                    value={event.description}
                    onChange={(e) => handleEventChange(dayIndex, eventIndex, 'description', e.target.value)}
                  />
                </div>
                <div>
                  <label className="label-type position-relative">Type:</label>
                  <div>
                    <select
                      className="cursor-p ml-15 optional-select"
                      value={event.type}
                      onChange={(e) => handleEventChange(dayIndex, eventIndex, 'type', e.target.value)}
                    >
                      <option value="" disabled>Select Type</option>
                      <option value="Optional">Optional</option>
                      <option value="Mandatory">Mandatory</option>
                    </select>
                    <i className="fa-solid fa-chevron-down arrow-select position-relative cursor-p" />
                  </div>
                </div>
                <div>
                  <label className="event-price-label">Price of Adult:</label>
                  <div className="d-flex align-c">
                    <input
                      className="input-price"
                      type="number"
                      value={event.price_adult}
                      onChange={(e) => handleEventChange(dayIndex, eventIndex, 'price_adult', e.target.value)}
                    />
                    <span className="ml-10 dollar-sign fs-18">$</span>
                  </div>
                </div>
                <div>
                  <label className="event-price-label">Price of Child:</label>
                  <div className="d-flex align-c">
                    <input
                      className="input-price"
                      type="number"
                      value={event.price_child}
                      onChange={(e) => handleEventChange(dayIndex, eventIndex, 'price_child', e.target.value)}
                    />
                    <span className="ml-10 dollar-sign fs-18">$</span>
                  </div>
                </div>
                <div>
                  <label>Additional Notes:</label>
                  <textarea
                    className="ml-15"
                    placeholder="Additional Notes"
                    value={event.additional_note}
                    onChange={(e) => handleEventChange(dayIndex, eventIndex, 'additional_note', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="mb-50 d-flex buttons">
          <button type="button" onClick={handleSaveDetails} className="add-trip-bt" disabled={createMutation.isPending}>
            {createMutation.isPending ? 'Saving...' : 'Save Trip Details'}
          </button>
          <button type="button" className="add-trip-bt" onClick={handleAddDay}>Add Day</button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddTrip}
        className={`add-trip-bt ${!isDetailsSaved ? 'disabled' : ''}`}
        disabled={!isDetailsSaved || uploadMutation.isPending}
      >
        {uploadMutation.isPending ? 'Adding...' : 'Add Trip'}
      </button>
    </DashboardLayout>
  );
}
