<script>
  /**
   * @typedef {Object} TimelineEvent
   * @property {string} date - The date of the event
   * @property {string} title - The title of the event
   * @property {string} description - The description of the event
   * @property {string[]} [details] - Optional details about the event
   */

  /** @type {TimelineEvent[]} */
  export let events = [];
</script>

<div class="relative">
  <!-- Vertical line - hidden on mobile, visible on larger screens -->
  <div class="hidden md:block absolute h-full w-0.5 bg-gradient-to-b from-emerald-400 via-teal-500 to-cyan-600 left-1/2 transform -translate-x-1/2"></div>
  
  <!-- Mobile vertical line - left aligned -->
  <div class="md:hidden absolute h-full w-0.5 bg-gradient-to-b from-emerald-400 via-teal-500 to-cyan-600 left-4 transform translate-x-0.5"></div>
  
  <div class="space-y-12">
    {#each events as event, i}
      <div class="relative">
        <!-- Circle marker - repositioned for mobile -->
        <div class="absolute w-4 h-4 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full md:left-1/2 left-3 transform md:-translate-x-1/2 z-10 shadow-md"></div>
        
        <!-- Content box - Different layouts for mobile and desktop -->
        <div class="flex flex-col md:flex-row items-start">
          <!-- Date - for mobile, as a header -->
          <div class="md:hidden pl-12 mb-2 w-full">
            <div class="bg-gradient-to-r from-teal-50 to-emerald-100 text-teal-800 px-4 py-2 rounded-full inline-block font-medium shadow-sm border border-teal-200">
              {event.date}
            </div>
          </div>
          
          <!-- Desktop Layout -->
          <div class="hidden md:block w-full">
            <div class="flex items-start">
              <!-- Left Side Content (for odd index) -->
              <div class="w-1/2 pr-12 text-left {i % 2 !== 0 ? 'block' : 'invisible'}">
                {#if i % 2 !== 0}
                  <div class="bg-gradient-to-r from-teal-50 to-emerald-100 text-teal-800 px-4 py-2 rounded-full inline-block font-medium shadow-sm border border-teal-200 mb-4">
                    {event.date}
                  </div>
                  <h3 class="text-xl font-bold mb-2 text-gray-800">{event.title}</h3>
                  <p class="text-gray-600">{event.description}</p>
                  
                  {#if event.details && event.details.length > 0}
                    <ul class="mt-3 text-gray-600 list-disc pl-5">
                      {#each event.details as detail}
                        <li>{detail}</li>
                      {/each}
                    </ul>
                  {/if}
                {/if}
              </div>
              
              <!-- Right Side Content (for even index) -->
              <div class="w-1/2 pl-12 {i % 2 === 0 ? 'block' : 'invisible'}">
                {#if i % 2 === 0}
                  <div class="bg-gradient-to-r from-teal-50 to-emerald-100 text-teal-800 px-4 py-2 rounded-full inline-block font-medium shadow-sm border border-teal-200 mb-4">
                    {event.date}
                  </div>
                  <h3 class="text-xl font-bold mb-2 text-gray-800">{event.title}</h3>
                  <p class="text-gray-600">{event.description}</p>
                  
                  {#if event.details && event.details.length > 0}
                    <ul class="mt-3 text-gray-600 list-disc ml-5">
                      {#each event.details as detail}
                        <li>{detail}</li>
                      {/each}
                    </ul>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
          
          <!-- Mobile content display (always on right side) -->
          <div class="md:hidden w-full flex">
            <div class="w-10"></div> <!-- Empty space on left side -->
            <div class="flex-1">
              <h3 class="text-xl font-bold mb-2 text-gray-800">{event.title}</h3>
              <p class="text-gray-600">{event.description}</p>
              
              {#if event.details && event.details.length > 0}
                <ul class="mt-3 text-gray-600 list-disc pl-5">
                  {#each event.details as detail}
                    <li>{detail}</li>
                  {/each}
                </ul>
              {/if}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div> 