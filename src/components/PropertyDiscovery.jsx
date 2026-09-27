import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CreditCard,
  Heart,
  Home,
  IndianRupee,
  MapPin,
  Menu,
  Percent,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Square,
  Star,
  Tag,
  Users,
  WalletCards,
  X,
} from "lucide-react";

/*
|--------------------------------------------------------------------------
| GrihaDrishti Property Discovery
|--------------------------------------------------------------------------
|
| Single-file property discovery module.
|
| Includes:
| - Search
| - Filters
| - Property cards
| - Property details
| - Image gallery
| - Demo availability
| - Offers
| - Booking
| - Demo payment
| - Booking confirmation
| - My bookings
| - localStorage persistence
|
|--------------------------------------------------------------------------
*/

const BOOKING_STORAGE_KEY = "griha_property_bookings";

/*
|--------------------------------------------------------------------------
| Property data
|--------------------------------------------------------------------------
|
| Prices / configurations are based on publicly listed project information.
| Availability numbers are explicitly DEMO values.
|
*/

const PROPERTIES = [
  {
    id: "dtc-capital-city",
    name: "DTC Capital City",
    developer: "DTC Group",
    location: "Rajarhat, Kolkata",
    area: "Rajarhat Main Road",
    type: "Apartment",
    bhk: "2/3/4 BHK",
    priceFrom: 4500000,
    priceLabel: "₹45 L onwards",
    areaRange: "910 – 1,940 sq.ft",
    pricePerSqft: "₹4.95K/sq.ft*",
    status: "Under Construction",
    possession: "Dec 2026",
    rera: "RERA / Project information available from source",
    availableUnits: 24,
    availabilityType: "Demo Availability",
    offer: "Launch offers available",
    featured: true,
    rating: 4.7,
    amenities: [
      "70,000 sq.ft clubhouse",
      "Swimming Pool",
      "Gymnasium",
      "Sports Facilities",
      "24×7 Security",
      "Landscaped Areas",
    ],
    description:
      "A large residential development on Rajarhat Main Road with 2, 3 and 4 BHK configurations and a large clubhouse.",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
    ],
  },

  {
    id: "siddha-serena",
    name: "Siddha Serena",
    developer: "Siddha Group",
    location: "New Town, Kolkata",
    area: "New Town",
    type: "Apartment",
    bhk: "2/2.5/3/4 BHK",
    priceFrom: 7700000,
    priceLabel: "₹77 L onwards",
    areaRange: "586 – 1,415 sq.ft",
    pricePerSqft: "₹13K+/sq.ft*",
    status: "Under Construction",
    possession: "Dec 2028",
    rera: "Project information available",
    availableUnits: 17,
    availabilityType: "Demo Availability",
    offer: "Site visit offer",
    featured: true,
    rating: 4.8,
    amenities: [
      "26,000 sq.ft clubhouse",
      "Podium Amenities",
      "Swimming Pool",
      "Gymnasium",
      "Green Spaces",
      "Children's Play Area",
    ],
    description:
      "A New Town residential development offering 2, 2.5, 3 and 4 BHK homes with a large clubhouse and podium amenities.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
    ],
  },

  {
    id: "vinayak-21-acres",
    name: "Vinayak 21 Acres",
    developer: "Vinayak Group",
    location: "New Town, Kolkata",
    area: "New Town",
    type: "Apartment",
    bhk: "2/3 BHK",
    priceFrom: 7100000,
    priceLabel: "₹71 L onwards",
    areaRange: "971 – 1,491 sq.ft",
    pricePerSqft: "₹7.3K+/sq.ft*",
    status: "Under Construction",
    possession: "Mar 2032",
    rera: "RERA information available",
    availableUnits: 31,
    availabilityType: "Demo Availability",
    offer: "Selected units offer",
    featured: false,
    rating: 4.6,
    amenities: [
      "3-Acre Central Park",
      "Sports Ground",
      "Clubhouses",
      "Swimming Pool",
      "Gymnasium",
      "Security",
    ],
    description:
      "A large New Town residential development with 2 and 3 BHK configurations and extensive community amenities.",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
    ],
  },

  {
    id: "tata-avenida",
    name: "Tata Avenida",
    developer: "Tata Realty",
    location: "Action Area II, New Town",
    area: "New Town",
    type: "Apartment",
    bhk: "3/4 BHK",
    priceFrom: 14000000,
    priceLabel: "₹1.40 Cr onwards",
    areaRange: "Premium 3 & 4 BHK",
    pricePerSqft: "Project dependent",
    status: "Residential Project",
    possession: "Check latest developer schedule",
    rera: "WBRERA/P/NOR/2018/000102",
    availableUnits: 12,
    availabilityType: "Demo Availability",
    offer: "Special offer shown by project source",
    featured: true,
    rating: 4.9,
    amenities: [
      "13-Acre Development",
      "Boulevard",
      "Club Facilities",
      "Landscaped Areas",
      "Security",
      "Lifestyle Amenities",
    ],
    description:
      "Premium residential development in New Town offering 3 and 4 BHK homes across a large residential precinct.",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
    ],
  },

  {
    id: "town-square",
    name: "Srijan Town Square",
    developer: "Srijan Realty",
    location: "New Town, Kolkata",
    area: "New Town",
    type: "Apartment",
    bhk: "3/3.5/4/5 BHK",
    priceFrom: 26900000,
    priceLabel: "₹2.69 Cr onwards",
    areaRange: "1,815 – 3,626 sq.ft",
    pricePerSqft: "Premium segment",
    status: "Under Construction",
    possession: "Jan 2028",
    rera: "WBRERA/P/NOR/2023/000063",
    availableUnits: 8,
    availabilityType: "Demo Availability",
    offer: "Site visit",
    featured: true,
    rating: 4.9,
    amenities: [
      "Large Club Facilities",
      "Landscaped Areas",
      "Premium Lobby",
      "Fitness Facilities",
      "Recreation Areas",
      "Security",
    ],
    description:
      "Premium New Town development with large-format 3, 3.5, 4 and 5 BHK residences.",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
    ],
  },

  {
    id: "raajkutir",
    name: "RaajKutir",
    developer: "Vinayak Realtech",
    location: "New Town / Rajarhat, Kolkata",
    area: "New Town",
    type: "Apartment",
    bhk: "2/3 BHK",
    priceFrom: 3200000,
    priceLabel: "₹32 L onwards",
    areaRange: "419 – 1,238 sq.ft",
    pricePerSqft: "Project dependent",
    status: "Residential Project",
    possession: "Check project schedule",
    rera: "Project information available",
    availableUnits: 19,
    availabilityType: "Demo Availability",
    offer: "Limited-period demo offer",
    featured: false,
    rating: 4.5,
    amenities: [
      "Swimming Pool",
      "Gymnasium",
      "Community Hall",
      "24×7 Security",
      "Poolside Cabana",
      "Vastu Compliant Homes",
    ],
    description:
      "A smaller residential community offering 2 and 3 BHK homes in the New Town/Rajarhat area.",
    images: [
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    ],
  },
];

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function formatPrice(value) {
  if (!value) return "₹—";

  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  }

  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  }

  return `₹${value.toLocaleString("en-IN")}`;
}

function loadBookings() {
  try {
    const saved = localStorage.getItem(
      BOOKING_STORAGE_KEY
    );

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(
      "Unable to load property bookings:",
      error
    );

    return [];
  }
}

function saveBookings(bookings) {
  localStorage.setItem(
    BOOKING_STORAGE_KEY,
    JSON.stringify(bookings)
  );
}

function createBookingId() {
  return `GD-${Date.now()
    .toString(36)
    .toUpperCase()}-${Math.floor(
    Math.random() * 900 + 100
  )}`;
}

/*
|--------------------------------------------------------------------------
| Main Component
|--------------------------------------------------------------------------
*/

function PropertyDiscovery({
  onBack,
  user,
}) {
  const [view, setView] = useState("discover");

  const [selectedProperty, setSelectedProperty] =
    useState(null);

  const [galleryIndex, setGalleryIndex] = useState(0);

  const [search, setSearch] = useState("");

  const [selectedBhk, setSelectedBhk] =
    useState("All");

  const [selectedLocation, setSelectedLocation] =
    useState("All");

  const [selectedBudget, setSelectedBudget] =
    useState("All");

  const [showFilters, setShowFilters] =
    useState(false);

  const [favourites, setFavourites] =
    useState(() => {
      try {
        return JSON.parse(
          localStorage.getItem(
            "griha_property_favourites"
          ) || "[]"
        );
      } catch {
        return [];
      }
    });

  const [bookings, setBookings] =
    useState(loadBookings);

  const [showPayment, setShowPayment] =
    useState(false);

  const [bookingProperty, setBookingProperty] =
    useState(null);

  const [selectedUnit, setSelectedUnit] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("UPI");

  const [paymentProcessing, setPaymentProcessing] =
    useState(false);

  const [bookingSuccess, setBookingSuccess] =
    useState(null);

  /*
  |--------------------------------------------------------------------------
  | Filter data
  |--------------------------------------------------------------------------
  */

  const locations = [
    "All",
    "New Town",
    "Rajarhat",
    "New Town / Rajarhat",
    "Action Area II, New Town",
  ];

  const bhkOptions = [
    "All",
    "2 BHK",
    "3 BHK",
    "4 BHK",
    "5 BHK",
  ];

  /*
  |--------------------------------------------------------------------------
  | Filtered properties
  |--------------------------------------------------------------------------
  */

  const filteredProperties = useMemo(() => {
    const query = search.trim().toLowerCase();

    return PROPERTIES.filter((property) => {
      const matchesSearch =
        !query ||
        property.name
          .toLowerCase()
          .includes(query) ||
        property.location
          .toLowerCase()
          .includes(query) ||
        property.developer
          .toLowerCase()
          .includes(query);

      const matchesLocation =
        selectedLocation === "All" ||
        property.location
          .toLowerCase()
          .includes(
            selectedLocation
              .replace("Action Area II, New Town", "New Town")
              .toLowerCase()
          ) ||
        property.area
          .toLowerCase()
          .includes(
            selectedLocation
              .replace("Action Area II, New Town", "New Town")
              .toLowerCase()
          );

      const matchesBhk =
        selectedBhk === "All" ||
        property.bhk
          .toLowerCase()
          .includes(
            selectedBhk
              .replace(" BHK", "")
              .toLowerCase()
          );

      let matchesBudget = true;

      if (selectedBudget === "under-75") {
        matchesBudget = property.priceFrom < 7500000;
      }

      if (selectedBudget === "75-150") {
        matchesBudget =
          property.priceFrom >= 7500000 &&
          property.priceFrom <= 15000000;
      }

      if (selectedBudget === "above-150") {
        matchesBudget =
          property.priceFrom > 15000000;
      }

      return (
        matchesSearch &&
        matchesLocation &&
        matchesBhk &&
        matchesBudget
      );
    });
  }, [
    search,
    selectedBhk,
    selectedLocation,
    selectedBudget,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Favourite
  |--------------------------------------------------------------------------
  */

  const toggleFavourite = (propertyId) => {
    setFavourites((previous) => {
      const exists = previous.includes(propertyId);

      const updated = exists
        ? previous.filter(
            (id) => id !== propertyId
          )
        : [...previous, propertyId];

      localStorage.setItem(
        "griha_property_favourites",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Property details
  |--------------------------------------------------------------------------
  */

  const openProperty = (property) => {
    setSelectedProperty(property);
    setGalleryIndex(0);
    setView("details");
  };

  const closeProperty = () => {
    setSelectedProperty(null);
    setGalleryIndex(0);
    setView("discover");
  };

  /*
  |--------------------------------------------------------------------------
  | Booking
  |--------------------------------------------------------------------------
  */

  const openBooking = (property) => {
    setBookingProperty(property);
    setSelectedUnit("");
    setPaymentMethod("UPI");
    setBookingSuccess(null);
    setShowPayment(false);
    setView("booking");
  };

  const calculateBookingAmount = (property) => {
    /*
    Demo booking amount:
    1% of starting price, capped between ₹25,000 and ₹1,00,000.
    */

    const onePercent =
      property.priceFrom * 0.01;

    return Math.min(
      100000,
      Math.max(25000, onePercent)
    );
  };

  const handleProceedPayment = () => {
    if (!bookingProperty) return;

    if (!selectedUnit) {
      window.alert(
        "Please select a unit configuration first."
      );

      return;
    }

    setShowPayment(true);
  };

  /*
  |--------------------------------------------------------------------------
  | Demo payment
  |--------------------------------------------------------------------------
  */

  const handleDemoPayment = () => {
    if (!bookingProperty) return;

    setPaymentProcessing(true);

    setTimeout(() => {
      const booking = {
        id: createBookingId(),
        propertyId: bookingProperty.id,
        propertyName: bookingProperty.name,
        developer: bookingProperty.developer,
        location: bookingProperty.location,
        unit: selectedUnit,
        bookingAmount:
          calculateBookingAmount(
            bookingProperty
          ),
        paymentMethod,
        paymentStatus: "Demo Payment Successful",
        bookingStatus: "Booked",
        bookedAt: new Date().toISOString(),
        userEmail: user?.email || null,
      };

      const updatedBookings = [
        booking,
        ...bookings,
      ];

      setBookings(updatedBookings);

      saveBookings(updatedBookings);

      setPaymentProcessing(false);
      setShowPayment(false);
      setBookingSuccess(booking);
      setView("confirmation");
    }, 1800);
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="absolute top-[40%] -left-40 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[140px]" />

        <div className="absolute bottom-0 right-[20%] w-[400px] h-[300px] rounded-full bg-purple-600/10 blur-[140px]" />
      </div>

      {/* Header */}
      <header className="relative z-20 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="max-w-[1500px] mx-auto px-5 md:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={
                view === "discover"
                  ? onBack
                  : () => {
                      if (
                        view === "details"
                      ) {
                        closeProperty();
                      } else {
                        setView("discover");
                        setBookingSuccess(null);
                      }
                    }
              }
              className="flex items-center gap-2 text-white/70 hover:text-white transition"
            >
              <ArrowLeft size={18} />

              <span className="hidden sm:inline">
                {view === "discover"
                  ? "Dashboard"
                  : "Back"}
              </span>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-300 to-orange-500 text-black flex items-center justify-center shadow-lg">
                <Home size={20} />
              </div>

              <div>
                <div className="font-semibold tracking-tight">
                  GrihaDrishti
                </div>

                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Property Discovery
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                setView(
                  view === "bookings"
                    ? "discover"
                    : "bookings"
                )
              }
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 md:px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition"
            >
              <CalendarDays size={17} />

              <span className="hidden sm:inline">
                My Bookings
              </span>

              {bookings.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-300 text-black text-[10px] font-bold flex items-center justify-center">
                  {bookings.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Discovery */}
      {view === "discover" && (
        <DiscoveryView
          properties={filteredProperties}
          search={search}
          setSearch={setSearch}
          locations={locations}
          selectedLocation={selectedLocation}
          setSelectedLocation={
            setSelectedLocation
          }
          bhkOptions={bhkOptions}
          selectedBhk={selectedBhk}
          setSelectedBhk={setSelectedBhk}
          selectedBudget={selectedBudget}
          setSelectedBudget={setSelectedBudget}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          favourites={favourites}
          toggleFavourite={toggleFavourite}
          openProperty={openProperty}
          openBooking={openBooking}
        />
      )}

      {/* Details */}
      {view === "details" &&
        selectedProperty && (
          <PropertyDetailsView
            property={selectedProperty}
            galleryIndex={galleryIndex}
            setGalleryIndex={setGalleryIndex}
            favourites={favourites}
            toggleFavourite={toggleFavourite}
            onBook={() =>
              openBooking(selectedProperty)
            }
          />
        )}

      {/* Booking */}
      {view === "booking" &&
        bookingProperty && (
          <BookingView
            property={bookingProperty}
            selectedUnit={selectedUnit}
            setSelectedUnit={setSelectedUnit}
            onProceed={
              handleProceedPayment
            }
            bookingAmount={calculateBookingAmount(
              bookingProperty
            )}
          />
        )}

      {/* Confirmation */}
      {view === "confirmation" &&
        bookingSuccess && (
          <BookingConfirmation
            booking={bookingSuccess}
            onDiscover={() => {
              setBookingSuccess(null);
              setView("discover");
            }}
            onBookings={() =>
              setView("bookings")
            }
          />
        )}

      {/* Bookings */}
      {view === "bookings" && (
        <BookingsView
          bookings={bookings}
          onDiscover={() =>
            setView("discover")
          }
        />
      )}

      {/* Demo Payment Modal */}
      {showPayment &&
        bookingProperty && (
          <PaymentModal
            property={bookingProperty}
            amount={calculateBookingAmount(
              bookingProperty
            )}
            paymentMethod={paymentMethod}
            setPaymentMethod={
              setPaymentMethod
            }
            processing={paymentProcessing}
            onClose={() =>
              setShowPayment(false)
            }
            onPay={handleDemoPayment}
          />
        )}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Discovery View
|--------------------------------------------------------------------------
*/

function DiscoveryView({
  properties,
  search,
  setSearch,
  locations,
  selectedLocation,
  setSelectedLocation,
  bhkOptions,
  selectedBhk,
  setSelectedBhk,
  selectedBudget,
  setSelectedBudget,
  showFilters,
  setShowFilters,
  favourites,
  toggleFavourite,
  openProperty,
  openBooking,
}) {
  return (
    <main className="relative z-10 max-w-[1500px] mx-auto px-5 md:px-8 py-8 md:py-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#101827] via-[#08101e] to-[#120d1b] p-7 md:p-12 mb-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.14),transparent_30%),radial-gradient(circle_at_10%_90%,rgba(59,130,246,0.12),transparent_35%)]" />

        <div className="relative max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1.5 text-xs text-amber-200 mb-5">
            <Sparkles size={14} />
            Curated Kolkata Properties
          </div>

          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            Find a home that
            <span className="text-amber-300">
              {" "}
              feels right.
            </span>
          </h1>

          <p className="mt-5 text-white/55 max-w-2xl text-base md:text-lg leading-7">
            Explore selected residential projects
            across New Town, Rajarhat and nearby
            Kolkata locations with pricing,
            configurations, amenities and demo
            booking.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-3xl">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl px-4 py-3">
              <Search
                size={20}
                className="text-white/40"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search project, developer or location..."
                className="flex-1 bg-transparent outline-none text-white placeholder:text-white/30"
              />

              <button
                onClick={() =>
                  setShowFilters(
                    (value) => !value
                  )
                }
                className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/15 transition"
              >
                <SlidersHorizontal size={16} />
                <span className="hidden sm:inline">
                  Filters
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter */}
      {showFilters && (
        <section className="mb-8 rounded-2xl border border-white/10 bg-white/[0.035] p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FilterSelect
              label="Location"
              value={selectedLocation}
              options={locations}
              onChange={
                setSelectedLocation
              }
            />

            <FilterSelect
              label="Configuration"
              value={selectedBhk}
              options={bhkOptions}
              onChange={setSelectedBhk}
            />

            <FilterSelect
              label="Budget"
              value={selectedBudget}
              options={[
                "All",
                "under-75",
                "75-150",
                "above-150",
              ]}
              labels={{
                All: "Any budget",
                "under-75":
                  "Under ₹75 L",
                "75-150":
                  "₹75 L – ₹1.5 Cr",
                "above-150":
                  "Above ₹1.5 Cr",
              }}
              onChange={setSelectedBudget}
            />
          </div>
        </section>
      )}

      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/35">
            Discovery
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold mt-1">
            Properties in Kolkata
          </h2>
        </div>

        <div className="text-sm text-white/45">
          {properties.length} properties
        </div>
      </div>

      {/* Cards */}
      {properties.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] py-20 text-center">
          <Search
            size={40}
            className="mx-auto text-white/20"
          />

          <h3 className="mt-5 text-xl font-semibold">
            No properties found
          </h3>

          <p className="mt-2 text-white/40">
            Try another search or filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              favourite={favourites.includes(
                property.id
              )}
              onFavourite={() =>
                toggleFavourite(
                  property.id
                )
              }
              onView={() =>
                openProperty(property)
              }
              onBook={() =>
                openBooking(property)
              }
            />
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8 flex gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-xs leading-5 text-white/35">
        <ShieldCheck
          size={16}
          className="shrink-0 mt-0.5"
        />

        <p>
          Prices, possession schedules and project
          details are based on publicly available
          listing/project information and can change.
          Availability shown inside this demo is
          clearly marked as demo availability and is
          not live inventory.
        </p>
      </div>
    </main>
  );
}

/*
|--------------------------------------------------------------------------
| Property Card
|--------------------------------------------------------------------------
*/

function PropertyCard({
  property,
  favourite,
  onFavourite,
  onView,
  onBook,
}) {
  return (
    <article className="group rounded-[26px] border border-white/10 bg-white/[0.035] overflow-hidden hover:border-white/20 transition duration-300">
      {/* Image */}
      <div className="relative h-[250px] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.name}
          className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

        {property.featured && (
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-amber-300 text-black px-3 py-1.5 text-xs font-semibold">
            <Sparkles size={12} />
            Featured
          </div>
        )}

        <button
          onClick={onFavourite}
          className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/15 bg-black/30 backdrop-blur-md flex items-center justify-center hover:bg-black/50 transition"
        >
          <Heart
            size={18}
            className={
              favourite
                ? "fill-red-400 text-red-400"
                : "text-white"
            }
          />
        </button>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold">
                {property.name}
              </h3>

              <div className="flex items-center gap-1.5 mt-1 text-white/60 text-sm">
                <MapPin size={14} />
                {property.location}
              </div>
            </div>

            <div className="flex items-center gap-1 text-amber-300 text-sm">
              <Star
                size={14}
                className="fill-amber-300"
              />
              {property.rating}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 flex-wrap">
          <InfoPill icon={<BedDouble size={14} />}>
            {property.bhk}
          </InfoPill>

          <InfoPill icon={<Square size={14} />}>
            {property.areaRange}
          </InfoPill>
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-white/35">
              Starting price
            </p>

            <p className="text-2xl font-semibold text-amber-300 mt-1">
              {property.priceLabel}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-white/35">
              Status
            </p>

            <p className="text-xs text-emerald-300 mt-1">
              {property.status}
            </p>
          </div>
        </div>

        {/* Offer */}
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-300/[0.07] border border-amber-300/10 px-3 py-2.5">
          <Tag
            size={15}
            className="text-amber-300"
          />

          <span className="text-xs text-amber-100/80">
            {property.offer}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 text-white/40">
            <Building2 size={14} />
            {property.developer}
          </span>

          <span className="flex items-center gap-1.5 text-white/40">
            <Users size={14} />
            {property.availableUnits} demo units
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            onClick={onView}
            className="rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium hover:bg-white/10 transition"
          >
            View Details
          </button>

          <button
            onClick={onBook}
            className="rounded-xl bg-white text-black py-3 text-sm font-semibold hover:bg-white/90 transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </article>
  );
}

/*
|--------------------------------------------------------------------------
| Details
|--------------------------------------------------------------------------
*/

function PropertyDetailsView({
  property,
  galleryIndex,
  setGalleryIndex,
  favourites,
  toggleFavourite,
  onBook,
}) {
  return (
    <main className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 py-8">
      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-7">
        {/* Gallery */}
        <section className="rounded-[28px] overflow-hidden border border-white/10 bg-white/[0.035]">
          <div className="relative h-[420px] md:h-[600px]">
            <img
              src={property.images[galleryIndex]}
              alt={property.name}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

            <button
              onClick={() =>
                setGalleryIndex(
                  (galleryIndex -
                    1 +
                    property.images.length) %
                    property.images.length
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() =>
                setGalleryIndex(
                  (galleryIndex + 1) %
                    property.images.length
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-white/50 text-sm">
                {property.developer}
              </p>

              <h1 className="text-3xl md:text-5xl font-semibold mt-1">
                {property.name}
              </h1>

              <div className="flex items-center gap-2 mt-2 text-white/60">
                <MapPin size={16} />
                {property.location}
              </div>
            </div>
          </div>

          <div className="p-4 grid grid-cols-3 gap-3">
            {property.images.map(
              (image, index) => (
                <button
                  key={image}
                  onClick={() =>
                    setGalleryIndex(index)
                  }
                  className={`h-24 rounded-xl overflow-hidden border-2 transition ${
                    galleryIndex === index
                      ? "border-amber-300"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              )
            )}
          </div>
        </section>

        {/* Info */}
        <section>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                  Property Overview
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold mt-2">
                  {property.bhk}
                </h2>
              </div>

              <button
                onClick={() =>
                  toggleFavourite(
                    property.id
                  )
                }
                className="w-11 h-11 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center"
              >
                <Heart
                  size={19}
                  className={
                    favourites.includes(
                      property.id
                    )
                      ? "fill-red-400 text-red-400"
                      : "text-white"
                  }
                />
              </button>
            </div>

            <div className="mt-7">
              <p className="text-xs text-white/35">
                Starting price
              </p>

              <p className="text-4xl font-semibold text-amber-300 mt-1">
                {property.priceLabel}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-7">
              <DetailStat
                icon={<BedDouble size={17} />}
                label="Configuration"
                value={property.bhk}
              />

              <DetailStat
                icon={<Square size={17} />}
                label="Area"
                value={property.areaRange}
              />

              <DetailStat
                icon={<CalendarDays size={17} />}
                label="Possession"
                value={property.possession}
              />

              <DetailStat
                icon={<Building2 size={17} />}
                label="Status"
                value={property.status}
              />
            </div>

            <div className="mt-6 rounded-2xl border border-amber-300/10 bg-amber-300/[0.05] p-4">
              <div className="flex items-center gap-2 text-amber-300">
                <Tag size={16} />

                <span className="font-medium text-sm">
                  Current Offer
                </span>
              </div>

              <p className="text-sm text-white/65 mt-2">
                {property.offer}
              </p>
            </div>

            <button
              onClick={onBook}
              className="w-full mt-7 rounded-2xl bg-gradient-to-r from-amber-300 to-orange-400 text-black py-4 font-semibold flex items-center justify-center gap-2 hover:brightness-105 transition"
            >
              <CalendarDays size={19} />
              Book This Property
            </button>

            <p className="text-center text-xs text-white/30 mt-3">
              Demo booking · No real payment
            </p>
          </div>

          {/* Description */}
          <div className="mt-5 rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
            <h3 className="text-lg font-semibold">
              About this property
            </h3>

            <p className="mt-3 text-sm text-white/50 leading-7">
              {property.description}
            </p>

            <h3 className="text-lg font-semibold mt-7">
              Amenities
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {property.amenities.map(
                (amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 text-sm text-white/60"
                  >
                    <Check
                      size={15}
                      className="text-emerald-300"
                    />

                    {amenity}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Availability */}
          <div className="mt-5 rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Availability
                </p>

                <h3 className="text-xl font-semibold mt-1">
                  {property.availableUnits} units
                </h3>
              </div>

              <div className="rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 px-3 py-1 text-xs">
                Demo Availability
              </div>
            </div>

            <div className="mt-4 h-2 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-300"
                style={{
                  width: `${Math.min(
                    100,
                    property.availableUnits *
                      2.5
                  )}%`,
                }}
              />
            </div>

            <p className="mt-3 text-xs text-white/30">
              Availability shown here is for the
              GrihaDrishti demo and is not live
              inventory.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

/*
|--------------------------------------------------------------------------
| Booking
|--------------------------------------------------------------------------
*/

function BookingView({
  property,
  selectedUnit,
  setSelectedUnit,
  onProceed,
  bookingAmount,
}) {
  const units = [
    `${property.bhk.split("/")[0]} · Standard`,
    `${property.bhk.split("/")[0]} · Premium`,
    `${property.bhk.split("/")[1] || "3 BHK"} · Premium`,
  ];

  return (
    <main className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 py-10">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-300/70">
          Demo Booking
        </p>

        <h1 className="text-3xl md:text-5xl font-semibold mt-2">
          Reserve your property
        </h1>

        <p className="text-white/45 mt-3">
          Select a configuration and continue to
          the demo payment screen.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_0.75fr] gap-6">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
          <div className="flex gap-4">
            <img
              src={property.images[0]}
              alt={property.name}
              className="w-28 h-24 rounded-2xl object-cover"
            />

            <div>
              <h2 className="text-xl font-semibold">
                {property.name}
              </h2>

              <p className="text-sm text-white/45 mt-1">
                {property.location}
              </p>

              <p className="text-amber-300 font-medium mt-2">
                {property.priceLabel}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium">
              Select unit configuration
            </p>

            <div className="grid gap-3 mt-3">
              {units.map((unit) => (
                <button
                  key={unit}
                  onClick={() =>
                    setSelectedUnit(unit)
                  }
                  className={`text-left rounded-2xl border p-4 transition ${
                    selectedUnit === unit
                      ? "border-amber-300 bg-amber-300/10"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>
                      {unit}
                    </span>

                    {selectedUnit ===
                      unit && (
                      <Check
                        size={18}
                        className="text-amber-300"
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onProceed}
            className="w-full mt-7 rounded-2xl bg-white text-black py-4 font-semibold hover:bg-white/90 transition"
          >
            Continue to Demo Payment
          </button>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 h-fit">
          <p className="text-xs uppercase tracking-[0.2em] text-white/30">
            Booking Summary
          </p>

          <div className="mt-6 space-y-4">
            <SummaryRow
              label="Property"
              value={property.name}
            />

            <SummaryRow
              label="Starting price"
              value={property.priceLabel}
            />

            <SummaryRow
              label="Configuration"
              value={
                selectedUnit || "Not selected"
              }
            />

            <div className="border-t border-white/10 pt-4">
              <SummaryRow
                label="Demo booking amount"
                value={formatPrice(
                  bookingAmount
                )}
                highlight
              />
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-blue-400/5 border border-blue-400/10 p-3 text-xs text-white/40 leading-5">
            This amount is only used to simulate
            the booking/payment flow inside the
            GrihaDrishti demo.
          </div>
        </div>
      </div>
    </main>
  );
}

/*
|--------------------------------------------------------------------------
| Payment Modal
|--------------------------------------------------------------------------
*/

function PaymentModal({
  property,
  amount,
  paymentMethod,
  setPaymentMethod,
  processing,
  onClose,
  onPay,
}) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-5">
      <div className="w-full max-w-lg rounded-[28px] border border-white/10 bg-[#0a101c] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-300/70">
              Demo Payment
            </p>

            <h2 className="text-2xl font-semibold mt-1">
              Complete booking
            </h2>
          </div>

          <button
            onClick={onClose}
            disabled={processing}
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"
          >
            <X size={19} />
          </button>
        </div>

        <div className="p-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
            <div className="flex items-center gap-3">
              <CreditCard
                size={20}
                className="text-amber-300"
              />

              <div>
                <p className="text-sm font-medium">
                  {property.name}
                </p>

                <p className="text-xs text-white/40 mt-1">
                  Demo booking payment
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-end justify-between">
              <span className="text-sm text-white/40">
                Payable now
              </span>

              <span className="text-3xl font-semibold text-amber-300">
                {formatPrice(amount)}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium mb-3">
              Select demo payment method
            </p>

            <div className="grid grid-cols-3 gap-2">
              {["UPI", "Card", "Net Banking"].map(
                (method) => (
                  <button
                    key={method}
                    onClick={() =>
                      setPaymentMethod(method)
                    }
                    disabled={processing}
                    className={`rounded-xl border px-3 py-3 text-xs transition ${
                      paymentMethod === method
                        ? "border-amber-300 bg-amber-300/10 text-amber-200"
                        : "border-white/10 bg-white/5 text-white/50"
                    }`}
                  >
                    {method}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-blue-400/10 bg-blue-400/5 p-3 text-xs text-white/40">
            No real money will be charged. This is
            a simulated payment screen for the
            GrihaDrishti project demo.
          </div>

          <button
            onClick={onPay}
            disabled={processing}
            className="w-full mt-6 rounded-2xl bg-gradient-to-r from-amber-300 to-orange-400 text-black py-4 font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {processing ? (
              <>
                <span className="w-5 h-5 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                Processing Demo Payment...
              </>
            ) : (
              <>
                <WalletCards size={18} />
                Pay & Confirm Booking
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Booking Confirmation
|--------------------------------------------------------------------------
*/

function BookingConfirmation({
  booking,
  onDiscover,
  onBookings,
}) {
  return (
    <main className="relative z-10 max-w-3xl mx-auto px-5 md:px-8 py-14">
      <div className="rounded-[32px] border border-emerald-400/15 bg-emerald-400/[0.035] p-7 md:p-12 text-center">
        <div className="mx-auto w-20 h-20 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
          <Check
            size={36}
            className="text-emerald-300"
          />
        </div>

        <p className="mt-7 text-xs uppercase tracking-[0.25em] text-emerald-300/70">
          Booking Confirmed
        </p>

        <h1 className="text-4xl md:text-5xl font-semibold mt-3">
          Your property is booked.
        </h1>

        <p className="text-white/45 mt-4">
          Demo payment was completed successfully.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5 text-left">
          <SummaryRow
            label="Booking ID"
            value={booking.id}
          />

          <SummaryRow
            label="Property"
            value={booking.propertyName}
          />

          <SummaryRow
            label="Location"
            value={booking.location}
          />

          <SummaryRow
            label="Unit"
            value={booking.unit}
          />

          <SummaryRow
            label="Payment"
            value={formatPrice(
              booking.bookingAmount
            )}
            highlight
          />

          <SummaryRow
            label="Status"
            value="Booked"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-7">
          <button
            onClick={onDiscover}
            className="rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium"
          >
            Discover More
          </button>

          <button
            onClick={onBookings}
            className="rounded-xl bg-white text-black py-3 text-sm font-semibold"
          >
            View My Bookings
          </button>
        </div>
      </div>
    </main>
  );
}

/*
|--------------------------------------------------------------------------
| My Bookings
|--------------------------------------------------------------------------
*/

function BookingsView({
  bookings,
  onDiscover,
}) {
  return (
    <main className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 py-10">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-300/70">
          Your Activity
        </p>

        <h1 className="text-4xl md:text-5xl font-semibold mt-2">
          My Bookings
        </h1>

        <p className="text-white/45 mt-3">
          Your GrihaDrishti property booking records.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-[28px] border border-white/10 bg-white/[0.035] py-20 text-center">
          <CalendarDays
            size={42}
            className="mx-auto text-white/20"
          />

          <h2 className="text-xl font-semibold mt-5">
            No bookings yet
          </h2>

          <p className="text-white/40 mt-2">
            Your confirmed demo bookings will
            appear here.
          </p>

          <button
            onClick={onDiscover}
            className="mt-6 rounded-xl bg-white text-black px-5 py-3 text-sm font-semibold"
          >
            Explore Properties
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-[26px] border border-white/10 bg-white/[0.035] p-5 md:p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-300/10 border border-amber-300/10 flex items-center justify-center">
                    <Building2
                      size={23}
                      className="text-amber-300"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      {booking.propertyName}
                    </h3>

                    <p className="text-sm text-white/40 mt-1">
                      {booking.location}
                    </p>

                    <p className="text-xs text-white/30 mt-2">
                      {booking.id}
                    </p>
                  </div>
                </div>

                <div className="md:text-right">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 text-xs text-emerald-300">
                    <Check size={13} />
                    {booking.bookingStatus}
                  </span>

                  <p className="text-lg font-semibold text-amber-300 mt-3">
                    {formatPrice(
                      booking.bookingAmount
                    )}
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mt-5">
                <MiniBookingInfo
                  label="Unit"
                  value={booking.unit}
                />

                <MiniBookingInfo
                  label="Payment"
                  value={booking.paymentMethod}
                />

                <MiniBookingInfo
                  label="Date"
                  value={new Date(
                    booking.bookedAt
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

/*
|--------------------------------------------------------------------------
| Small Components
|--------------------------------------------------------------------------
*/

function FilterSelect({
  label,
  value,
  options,
  onChange,
  labels = {},
}) {
  return (
    <label className="block">
      <span className="text-xs text-white/35">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-2 w-full rounded-xl border border-white/10 bg-[#0a101c] text-white px-4 py-3 outline-none"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {labels[option] || option}
          </option>
        ))}
      </select>
    </label>
  );
}

function InfoPill({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/55">
      {icon}
      {children}
    </span>
  );
}

function DetailStat({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
      <div className="flex items-center gap-2 text-white/35">
        {icon}
        <span className="text-xs">
          {label}
        </span>
      </div>

      <p className="text-sm text-white/75 mt-2">
        {value}
      </p>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  highlight = false,
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <span className="text-sm text-white/40">
        {label}
      </span>

      <span
        className={`text-sm text-right ${
          highlight
            ? "text-amber-300 font-semibold"
            : "text-white/75"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function MiniBookingInfo({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">
        {label}
      </p>

      <p className="text-sm text-white/65 mt-1">
        {value}
      </p>
    </div>
  );
}

export default PropertyDiscovery;