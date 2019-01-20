# frozen_string_literal: true

require 'tty-command'

namespace :mastodon do
  namespace :remote do
    desc 'Prune unconnected remote statuses that are older than NUM_DAYS (by default 60), limited to MAX_LINES statuses at once (default 40000).'
    task prune: :environment do
      time_ago = ENV.fetch('NUM_DAYS') { 60 }.to_i.days.ago
      max_lines = ENV.fetch('MAX_LINES') { 40000 }
      
      puts "Searching for statuses to delete..."
      # fuck active record tho
      Status.find_by_sql ["SELECT * FROM statuses WHERE local = false AND conversation_id IN (SELECT conversation_id FROM statuses GROUP BY conversation_id,id HAVING MAX(created_at) < ? AND SUM(local::int) = 0) LIMIT ?", time_ago, max_lines] do |status|
       
        delete_me = true
        deleted_statuses = 0
        Favourite.where(status_id: status.id).find_each do |fav|
          if fav.account.local?
            delete_me = false
            break
          end
        end
        if delete_me
          status.destroy!
          deleted_statuses += 1
          puts deleted_statuses if deleted_statuses % 100 = 0
        end        
      end
    end
  end
end