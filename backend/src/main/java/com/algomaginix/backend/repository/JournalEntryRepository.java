// src/main/java/com/algomaginix/backend/repository/JournalEntryRepository.java

package com.algomaginix.backend.repository;

import com.algomaginix.backend.model.JournalEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JournalEntryRepository extends JpaRepository<JournalEntry, Long> {
}
