# frozen_string_literal: true
# == Schema Information
#
# Table name: favourites
#
#  id         :bigint(8)        not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  account_id :bigint(8)        not null
#  status_id  :bigint(8)        not null
#

class Favourite < ApplicationRecord
  include Paginable

  update_index('statuses#status', :status) if Chewy.enabled?

  belongs_to :account, inverse_of: :favourites
  belongs_to :status,  inverse_of: :favourites

  has_one :notification, as: :activity, dependent: :destroy

  validates :status_id, uniqueness: { scope: :account_id }

  before_validation do
    self.status = status.reblog if status&.reblog?
  end

  after_create :increment_cache_counters
  after_destroy :decrement_cache_counters

  private

  def increment_cache_counters
    status&.increment_count!(:favourites_count)
  end

  def decrement_cache_counters
    return if association(:status).loaded? && (status.marked_for_destruction? || status.marked_for_mass_destruction?)
    status&.decrement_count!(:favourites_count)
  end
  
  def local?
    self.account.local?
  end
end
