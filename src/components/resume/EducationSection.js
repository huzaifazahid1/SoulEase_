import React from "react";

const EducationSection = ({ education, color }) => {
  const defaultEducation = [
    {
      id: "1",
      school: "School",
      degree: "Degree",
      field: "Field of Study",
      location: "City, Country",
      startDate: "2016",
      endDate: "2019",
      description: "Lorem ipsum dolor sit amet, consectetur.",
    },
    {
      id: "2",
      school: "College",
      degree: "Degree",
      field: "Field of Study",
      location: "City, Country",
      startDate: "2016",
      endDate: "2019",
      description: "Lorem ipsum dolor sit amet, consectetur.",
    },
    {
      id: "3",
      school: "University",
      degree: "Degree",
      field: "Field of Study",
      location: "City, Country",
      startDate: "2016",
      endDate: "2019",
      description: "Lorem ipsum dolor sit amet, consectetur.",
    },
  ];

  const educationItems = education?.length > 0 ? education : defaultEducation;

  return (
    <div className="py-6 px-8">
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-12 h-12 flex items-center justify-center"
          style={{ color }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold uppercase" style={{ color }}>
          Education
        </h2>
      </div>

      <div className="space-y-6">
        {educationItems.map((item, index) => (
          <div
            key={item.id || index}
            className="relative pl-7 border-l-2 pb-2"
            style={{ borderColor: color }}
          >
            <div
              className="absolute -left-[9px] top-0 w-4 h-4 rounded-full"
              style={{ backgroundColor: color }}
            ></div>

            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{item.school}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {item.degree} - {item.field}
                  </p>
                </div>
                <div className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full flex items-center justify-center text-sm font-medium">
                  {item.startDate}-{item.endDate}
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationSection;
